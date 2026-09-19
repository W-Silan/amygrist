# Product pilot — Complete Meditation Series

Updated: 18 September 2026.

This pilot maps WordPress product 1213 to `/shop/gma_complete_series/`. The previous URL is `/product/gma_complete_series/`; its redirect remains recorded in `ROUTE-INVENTORY.json` for cutover and is not active yet.

## Preserved product record

- Product: Guided Meditation Audio MP3 | COMPLETE SERIES | Instant Digital Download
- SEO title: Guided Meditation Audio Series MP3 | Wellbeing
- Price: £35.95 GBP
- Type: virtual, downloadable product
- Delivery: one protected ZIP containing MP3 audio files and a text file
- WordPress limit: 5 downloads
- WordPress expiry: 180 days
- Source images: media IDs 1150, 1147 and 1148, copied from their original 1080×1080 uploads
- Protected source file: remains only in the private archive under `uploads/woocommerce_uploads/`; it must never enter `src/`, `public/` or the static build

## Pilot implementation

The product record lives in `src/data/products.ts` and is rendered by the reusable static route `src/pages/shop/[slug].astro`. The homepage Complete Series card now opens the local pilot. Product images, content, pricing and policy text are present. The Buy it now button becomes a working link only when this build variable is set:

```text
PUBLIC_STRIPE_GMA_COMPLETE_SERIES_URL=https://buy.stripe.com/...
```

The public Stripe URL is not a secret. Until supplied, the button is visibly disabled and the page cannot take payment.

## Purchase and download flow still required

1. Create the Stripe product and one-time GBP price for £35.95.
2. Create a reusable Stripe Payment Link and collect the customer's email address.
3. Add stable product metadata such as `product_slug=gma_complete_series` so fulfilment can identify the purchase.
4. Point the product's `PUBLIC_STRIPE_GMA_COMPLETE_SERIES_URL` build variable to that link.
5. Configure Stripe's post-payment redirect to an Amy Grist confirmation route containing the Checkout Session ID.
6. Receive and verify Stripe `checkout.session.completed` webhooks in server-side code. Do not grant a download merely because someone opens the confirmation URL.
7. Store the ZIP privately, recommended in Cloudflare R2. After verified payment, issue a short-lived download URL or token and enforce the agreed expiry/download policy.
8. Send the buyer a receipt and download instructions. Decide whether Stripe's receipt is sufficient or a separate transactional email provider is needed.
9. Make fulfilment idempotent so a retried webhook never creates duplicate order records or emails.
10. Test successful, failed, cancelled and delayed payments, expired links, repeat downloads and support recovery before enabling the button in production.

Stripe Payment Links create hosted Checkout Sessions and expose Checkout events for tracking. Stripe's fulfilment guidance requires webhooks because a customer may pay without returning to the success page. Cloudflare R2 can provide temporary presigned GET URLs for a private object. References:

- https://docs.stripe.com/api/payment_links/payment_links
- https://docs.stripe.com/checkout/fulfillment
- https://developers.cloudflare.com/r2/api/s3/presigned-urls/

## Decisions and inputs needed

- Live or test Stripe Payment Link for the £35.95 product
- Download fulfilment choice: Cloudflare Worker/Pages Function plus private R2 is the recommended fit for this stack, or a managed digital-delivery service
- Whether to retain the old 5-download/180-day limits
- Transactional sender/service and the support email shown to buyers
- Confirmation/download page wording and refund policy approval
- UK/international digital-product tax treatment and whether Stripe Tax is required
- Whether buyers need durable order history or account access; the proposed flow does not require customer accounts
- Whether Stripe promotion codes should be accepted

## Source conflict to resolve

The export says the purchase includes 8 MP3 files, but its running-time copy lists seven tracks: Rest, Restore, Nourish, Grounding, Relaxing into Dreams, The Inner Child and Higher Wisdom. Rebalance appears elsewhere as a product and is probably the eighth track, but its duration must be confirmed rather than inferred. The pilot states “8 guided MP3 files” and omits the incomplete running-time list until Amy confirms it.
