const encoder = new TextEncoder();

const base64url = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes)))
  .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
const fromBase64url = value => Uint8Array.from(atob(value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - value.length % 4) % 4)), c => c.charCodeAt(0));
const timingSafeEqual = (a, b) => a.length === b.length && a.every((value, index) => value === b[index]);

async function sign(value, secret) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), {name: 'HMAC', hash: 'SHA-256'}, false, ['sign']);
  return new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(value)));
}

async function verifyStripeSignature(rawBody, header, secrets) {
  const parts = Object.fromEntries(header.split(',').map(part => part.split('=')));
  if (!parts.t || !parts.v1 || !secrets.length) return false;
  const timestamp = Number(parts.t);
  if (!Number.isFinite(timestamp) || Math.abs(Date.now() / 1000 - timestamp) > 300) return false;
  for (const secret of secrets) {
    const expected = await sign(`${parts.t}.${rawBody}`, secret);
    if (timingSafeEqual(expected, fromBase64url(parts.v1))) return true;
  }
  return false;
}

export async function makeDownloadToken(key, email, secret, expiresIn = 60 * 60 * 24 * 7) {
  const payload = base64url(encoder.encode(JSON.stringify({key, email, exp: Math.floor(Date.now() / 1000) + expiresIn})));
  const signature = base64url(await sign(payload, secret));
  return `${payload}.${signature}`;
}

async function readDownloadToken(token, secret) {
  const [payload, signature] = String(token || '').split('.');
  if (!payload || !signature || !secret || !timingSafeEqual(await sign(payload, secret), fromBase64url(signature))) return null;
  try {
    const value = JSON.parse(new TextDecoder().decode(fromBase64url(payload)));
    return value.exp > Math.floor(Date.now() / 1000) ? value : null;
  } catch { return null; }
}

const json = (body, status = 200) => new Response(JSON.stringify(body), {status, headers: {'content-type': 'application/json', 'cache-control': 'no-store'}});

async function sendEmail(env, {to, subject, text}) {
  const token = String(env.RESEND_API_KEY || '').trim();
  const from = String(env.RESEND_FROM || '').trim();
  if (!token || !from) throw new Error('Resend email sending is not configured');
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
    body: JSON.stringify({from, to: [to], subject, text}),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.id) throw new Error('Resend email sending failed');
}

export async function onStripeWebhook(request, env) {
  const rawBody = await request.text();
  const webhookSecrets = [env.STRIPE_WEBHOOK_SECRET, env.STRIPE_TEST_WEBHOOK_SECRET].filter(Boolean);
  if (!await verifyStripeSignature(rawBody, request.headers.get('stripe-signature') || '', webhookSecrets)) return json({error: 'Invalid signature'}, 400);
  let event;
  try { event = JSON.parse(rawBody); } catch { return json({error: 'Invalid event'}, 400); }
  if (event.type !== 'checkout.session.completed') return json({received: true});

  const session = event.data?.object;
  const productSlug = session?.metadata?.product_slug;
  if (productSlug !== 'gma_complete_series') return json({error: 'Unknown product'}, 400);
  if (!env.PRODUCTS_BUCKET || !env.PRODUCT_BUNDLE_KEY) return json({error: 'Storage is not configured'}, 500);
  const email = session.customer_details?.email || session.customer_email;
  if (!email) return json({error: 'Customer email missing'}, 400);

  const markerKey = `_orders/${session.id}.json`;
  if (await env.PRODUCTS_BUCKET.head(markerKey)) return json({received: true, duplicate: true});
  if (!await env.PRODUCTS_BUCKET.head(env.PRODUCT_BUNDLE_KEY)) return json({error: 'Product file missing'}, 500);
  const token = await makeDownloadToken(env.PRODUCT_BUNDLE_KEY, email, env.DOWNLOAD_TOKEN_SECRET || env.STRIPE_WEBHOOK_SECRET);
  const downloadUrl = `${new URL(request.url).origin}/api/download?token=${encodeURIComponent(token)}`;
  await env.PRODUCTS_BUCKET.put(markerKey, JSON.stringify({sessionId: session.id, email, productSlug, createdAt: new Date().toISOString()}), {httpMetadata: {contentType: 'application/json'}});
  const amy = String(env.FORM_RECIPIENT || '').trim();
  if (amy) await sendEmail(env, {to: amy, subject: `Meditation purchase: ${productSlug}`, text: `A purchase was completed.\n\nBuyer: ${email}\nProduct: ${productSlug}\nDownload link: ${downloadUrl}`});
  await sendEmail(env, {to: email, subject: 'Your Amy Grist meditation download', text: `Thank you for your purchase.\n\nDownload your Complete Meditation Series here:\n${downloadUrl}\n\nThis link expires in 7 days.`});
  return json({received: true});
}

export async function onDownload(request, env) {
  const value = await readDownloadToken(new URL(request.url).searchParams.get('token'), env.DOWNLOAD_TOKEN_SECRET || env.STRIPE_WEBHOOK_SECRET);
  if (!value || !env.PRODUCTS_BUCKET) return new Response('This download link is invalid or expired.', {status: 404});
  const object = await env.PRODUCTS_BUCKET.get(value.key);
  if (!object) return new Response('The download is unavailable.', {status: 404});
  return new Response(object.body, {headers: {'content-type': 'application/zip', 'content-disposition': 'attachment; filename="amy-grist-complete-meditation-series.zip"', 'cache-control': 'private, no-store'}});
}
