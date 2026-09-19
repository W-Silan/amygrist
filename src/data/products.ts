import {images} from './images';

export const products = [
  {
    sourceId: 1213,
    slug: 'gma_complete_series',
    name: 'Guided Meditation Audio MP3 | COMPLETE SERIES | Instant Digital Download',
    seoTitle: 'Guided Meditation Audio Series MP3 | Wellbeing',
    seoDescription: 'The Inner Harmony & Balance Meditation Series is a fully guided meditation series to support you in cultivating calm and restoring well-being.',
    price: '£35.95',
    currency: 'GBP',
    amount: 35.95,
    image: images[1150],
    imageAlt: 'Inner Harmony and Balance Meditation Series complete collection cover',
    gallery: [
      {image: images[1147], alt: 'Woman practising a gentle guided meditation with visualisation'},
      {image: images[1148], alt: 'People listening to guided meditations with headphones'},
    ],
    paymentUrl: import.meta.env.PUBLIC_STRIPE_GMA_COMPLETE_SERIES_URL?.trim() || '',
    summary: 'The Inner Harmony and Balance Meditation Series is intended to support you in cultivating greater states of wellness through mindful meditations, whether your practice is daily, regular or available for whenever you need. Each meditation is designed to encourage deeper states of relaxation, reducing feelings of tension, stress or anxiety and optimally returning you to a more harmonious state in mind, body, soul and spirit.',
    fileCount: 8,
    features: [
      'Encourages deeper states of relaxation and reduced feelings of tension, stress or anxiety',
      'Suitable for people beginning meditation and those with an established practice',
      'Fully guided MP3 audio with no background music',
      'Designed to support greater harmony and balance in mind, body, soul and spirit',
    ],
    delivery: 'Upon purchase you will receive a compressed ZIP file containing the MP3 audio files and a text file, ready to download to your device and begin listening.',
    safety: 'Do not listen to any meditation recording while driving or operating equipment or machinery.',
    terms: 'Guided meditations are for educational and entertainment purposes only and are not a substitute for professional medical, psychiatric or other advice or treatment. Due to the digital nature of this product, no refunds will be issued. All rights reserved. © Amy Grist.',
  },
] as const;

export type Product = (typeof products)[number];
