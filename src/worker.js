import {onRequestGet, onRequestPost} from '../functions/api/contact.js';
import {onDownload, onStripeWebhook} from './stripe.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact' || url.pathname === '/api/contact/') {
      if (request.method === 'GET' || request.method === 'HEAD') {
        return onRequestGet();
      }
      if (request.method === 'POST') {
        return onRequestPost({request, env, ctx, params: {}});
      }
      return new Response('Method not allowed.', {status: 405, headers: {Allow: 'GET, HEAD, POST'}});
    }
    if (url.pathname === '/api/stripe/webhook' && request.method === 'POST') return onStripeWebhook(request, env);
    if (url.pathname === '/api/download' && request.method === 'GET') return onDownload(request, env);

    return env.ASSETS.fetch(request);
  },
};
