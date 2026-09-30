import { EmailMessage } from 'cloudflare:email';

const CONTACT_TO = 'amygrist@gmail.com';
const MAX_BODY_BYTES = 25_000;
const enquiryLabels = {
  'inner-child-workshop': 'Inner Child Healing Workshop',
  'inner-child-mentoring': 'Inner Child Mentoring',
  coaching: 'Mindset & Wellbeing Coaching',
  'practitioner-training': 'Inner Child Practitioner Training',
  reiki: 'Inner Child Reiki',
  'card-reading': 'Inner Child Card Reading',
  general: 'General enquiry',
};

const respond = (message, status = 200) => new Response(JSON.stringify({message}), {
  status,
  headers: {'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store'},
});
const text = (value, max) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/[\r\n]/.test(value);

async function verifyTurnstile(token, secret, ip) {
  const body = new FormData();
  body.set('secret', secret);
  body.set('response', token);
  if (ip) body.set('remoteip', ip);
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {method: 'POST', body});
  const result = await response.json();
  return result.success === true;
}

export async function onRequestPost({request, env}) {
  const length = Number(request.headers.get('content-length') || 0);
  if (length > MAX_BODY_BYTES) return respond('Your message is too long.', 413);

  const requestOrigin = new URL(request.url).origin;
  const origin = request.headers.get('Origin');
  if (origin && origin !== requestOrigin) return respond('This form submission was rejected.', 403);

  let input;
  try {
    input = await request.json();
  } catch {
    return respond('Please complete the contact form and try again.', 400);
  }

  if (text(input.website, 200)) return respond('Thank you. Your message has been received.');

  const firstName = text(input.firstName, 80);
  const lastName = text(input.lastName, 80);
  const email = text(input.email, 254).toLowerCase();
  const phone = text(input.phone, 40);
  const enquiry = text(input.enquiry, 60);
  const message = text(input.message, 5000);
  const startedAt = Number(input.startedAt);
  const elapsed = Date.now() - startedAt;

  if (!firstName || !validEmail(email) || !enquiryLabels[enquiry] || message.length < 10 || input.consent !== true) {
    return respond('Please complete all required fields and check your email address.', 400);
  }
  if (!Number.isFinite(startedAt) || elapsed < 2500 || elapsed > 86_400_000) {
    return respond('Please refresh the page and submit the form again.', 400);
  }

  const ip = request.headers.get('CF-Connecting-IP') || '';
  if (env.CONTACT_RATE_LIMITER) {
    const limit = await env.CONTACT_RATE_LIMITER.limit({key: ip || email});
    if (!limit.success) return respond('Too many messages have been submitted. Please try again later.', 429);
  }

  if (env.TURNSTILE_SECRET_KEY) {
    const token = text(input['cf-turnstile-response'], 2048);
    if (!token || !await verifyTurnstile(token, env.TURNSTILE_SECRET_KEY, ip)) {
      return respond('The security check was not completed. Please try again.', 400);
    }
  }

  if (!env.SEND_EMAIL) return respond('Email delivery is not configured yet. Please try again later.', 503);
  const from = text(env.CONTACT_FROM || 'website@amygrist.com', 254).toLowerCase();
  if (!validEmail(from) || !from.endsWith('@amygrist.com')) {
    return respond('Email delivery is not configured correctly.', 503);
  }

  const fullName = [firstName, lastName].filter(Boolean).join(' ');
  const subject = `Website enquiry: ${enquiryLabels[enquiry]}`;
  const body = [
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not supplied'}`,
    `Enquiry: ${enquiryLabels[enquiry]}`,
    '',
    'Message:',
    message,
    '',
    `Submitted: ${new Date().toISOString()}`,
  ].join('\r\n');
  const raw = [
    `From: Amy Grist Website <${from}>`,
    `To: ${CONTACT_TO}`,
    `Reply-To: ${email}`,
    `Subject: ${subject}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@amygrist.com>`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: 8bit',
    '',
    body,
  ].join('\r\n');

  try {
    await env.SEND_EMAIL.send(new EmailMessage(from, CONTACT_TO, raw));
    return respond('Thank you. Your message has been sent to Amy.');
  } catch (error) {
    console.error('Contact email delivery failed', error);
    return respond('Your message could not be sent. Please try again later.', 502);
  }
}

export function onRequestGet() {
  return respond('Method not allowed.', 405);
}
