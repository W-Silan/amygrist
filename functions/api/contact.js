const EMAIL_API_URL = 'https://api.cloudflare.com/client/v4/accounts';
const EMAIL_SENDER = 'forms@innercouncil.org';
const MAX_BODY_BYTES = 25_000;
const ENQUIRY_LABELS = {
  'inner-child-workshop': 'Inner Child Healing Workshop',
  'inner-child-mentoring': 'Inner Child Mentoring',
  coaching: 'Mindset & Wellbeing Coaching',
  'practitioner-training': 'Inner Child Practitioner Training',
  reiki: 'Inner Child Reiki',
  'card-reading': 'Inner Child Card Reading',
  general: 'General enquiry',
};


const respond = (message, status = 200, extraHeaders = {}) => new Response(JSON.stringify({message}), {
  status,
  headers: {'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extraHeaders},
});
const text = (value, max) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const validEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/[\r\n]/.test(value);

async function verifyTurnstile(token, env, request) {
  if (!env.TURNSTILE_SECRET_KEY || !token) return false;
  const body = new URLSearchParams({secret: env.TURNSTILE_SECRET_KEY, response: token});
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) body.set('remoteip', ip);

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {method: 'POST', body});
    const result = await response.json();
    const allowedHosts = new Set(String(env.TURNSTILE_HOSTNAMES || 'amygrist.com,www.amygrist.com')
      .split(',').map(host => host.trim().toLowerCase()).filter(Boolean));
    return result.success === true && allowedHosts.has(String(result.hostname || '').toLowerCase());
  } catch {
    return false;
  }
}

async function sendFormEmail(env, message) {
  const accountId = text(env.CLOUDFLARE_ACCOUNT_ID, 100);
  const token = text(env.CLOUDFLARE_EMAIL_API_TOKEN, 500);
  if (!accountId || !token) throw new Error('Email Sending is not configured.');

  const response = await fetch(`${EMAIL_API_URL}/${encodeURIComponent(accountId)}/email/sending/send`, {
    method: 'POST',
    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
    body: JSON.stringify(message),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || result?.success !== true) {
    const providerError = Array.isArray(result?.errors) ? result.errors[0] : undefined;
    const providerCode = providerError?.code;
    const errorCode = Number.isInteger(providerCode) ? providerCode : response.status;
    const providerMessage = typeof providerError?.message === 'string'
      ? providerError.message.slice(0, 240)
      : '';
    throw new Error(`Cloudflare Email Sending rejected the request (code ${errorCode}${providerMessage ? `: ${providerMessage}` : ''}).`);
  }
}

export async function onRequestPost({request, env}) {
  const requestOrigin = new URL(request.url).origin;
  const origin = request.headers.get('Origin');
  if (origin) {
    try {
      if (new URL(origin).origin !== requestOrigin) return respond('This form submission could not be verified.', 403);
    } catch {
      return respond('This form submission could not be verified.', 403);
    }
  }

  const length = Number(request.headers.get('content-length') || 0);
  if (length > MAX_BODY_BYTES) return respond('Your message is too long.', 413);

  let input;
  try {
    input = await request.json();
  } catch {
    return respond('Please complete the form and try again.', 400);
  }
  if (!input || typeof input !== 'object' || Array.isArray(input)) return respond('Please complete the form and try again.', 400);
  if (text(input.website, 200)) return respond('Thank you. Your form has been received.');

  const feedback = input.formType === 'feedback';
  const feedbackName = text(input.name, 160);
  const firstName = text(input.firstName, 80);
  const lastName = text(input.lastName, 80);
  const email = text(input.email, 254).toLowerCase();
  const phone = text(input.phone, 40);
  const enquiry = text(input.enquiry, 60);
  const message = text(input.message, 5000);
  const startedAt = Number(input.startedAt);
  const elapsed = Date.now() - startedAt;

  const validSubmission = feedback
    ? feedbackName && validEmail(email) && message.length >= 10
    : firstName && validEmail(email) && ENQUIRY_LABELS[enquiry] && message.length >= 10 && input.consent === true;
  if (!validSubmission) {
    return respond('Please complete all required fields and check your email address.', 400);
  }
  if (!Number.isFinite(startedAt) || elapsed < 2500 || elapsed > 86_400_000) {
    return respond('Please refresh the page and submit the form again.', 400);
  }

  if (!env.FORM_RATE_LIMITER) return respond('Form submissions are temporarily unavailable. Please try again shortly.', 503);
  try {
    const {success} = await env.FORM_RATE_LIMITER.limit({key: request.headers.get('CF-Connecting-IP') || 'unknown'});
    if (!success) return respond('Too many messages have been submitted. Please try again in a minute.', 429, {'Retry-After': '60'});
  } catch {
    return respond('Form submissions are temporarily unavailable. Please try again shortly.', 503);
  }

  const captcha = text(input['cf-turnstile-response'], 2048);
  if (!await verifyTurnstile(captcha, env, request)) {
    return respond('Please complete the spam-protection check and submit again.', 400);
  }

  const recipient = text(env.FORM_RECIPIENT, 254).toLowerCase();
  if (recipient !== 'amygrist@gmail.com' || !validEmail(recipient)) {
    return respond('Form delivery is not configured correctly.', 503);
  }

  const fullName = feedback ? feedbackName : [firstName, lastName].filter(Boolean).join(' ');
  const emailMessage = {
    from: EMAIL_SENDER,
    to: recipient,
    reply_to: email,
    subject: feedback ? 'Website feedback' : `Website enquiry: ${ENQUIRY_LABELS[enquiry]}`,
    text: [
      `Name: ${fullName}`,
      `Email: ${email}`,
      ...(!feedback ? [`Phone: ${phone || 'Not supplied'}`, `Enquiry: ${ENQUIRY_LABELS[enquiry]}`] : []),
      '',
      'Message:',
      message,
      '',
      `Submitted: ${new Date().toISOString()}`,
    ].join('\n'),
  };

  try {
    await sendFormEmail(env, emailMessage);
    return respond(feedback ? 'Thank you for your feedback. It has been sent to Amy.' : 'Thank you. Your message has been sent to Amy.');
  } catch (error) {
    console.error('Contact email delivery failed', error instanceof Error ? error.message : 'Unknown error');
    return respond('Your message could not be sent just now. Please try again later.', 502);
  }
}

export function onRequestGet() {
  return respond('Method not allowed.', 405, {Allow: 'POST'});
}
