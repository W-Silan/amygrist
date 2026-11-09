import {images} from './images';

const sharedSafety = 'Do not listen to any meditation recording while driving or operating equipment or machinery.';
const sharedTerms = 'Guided meditations are for educational and entertainment purposes only and are not a substitute for professional medical, psychiatric or other advice or treatment. Due to the digital nature of this product, no refunds will be issued. All rights reserved. © Amy Grist.';

export const products = [
  {
    sourceId: 1213, category: 'meditation-series', slug: 'gma_complete_series', shortName: 'Complete Collection',
    name: 'Guided Meditation Audio MP3 | COMPLETE SERIES | Instant Digital Download',
    seoTitle: 'Guided Meditation Audio Series MP3 | Wellbeing',
    seoDescription: 'The Inner Harmony & Balance Meditation Series is a fully guided meditation series to support you in cultivating calm and restoring well-being.',
    price: '£35.95', currency: 'GBP', amount: 35.95, image: images[1150],
    imageAlt: 'Inner Harmony and Balance Meditation Series complete collection cover', gallery: [
      {image: images[1147], alt: 'Woman practising a gentle guided meditation with visualisation'},
      {image: images[1148], alt: 'People listening to guided meditations with headphones'},
    ], paymentUrl: import.meta.env.PUBLIC_STRIPE_GMA_COMPLETE_SERIES_URL?.trim() || '',
    summary: 'The Inner Harmony and Balance Meditation Series is intended to support you in cultivating greater states of wellness through mindful meditations, whether your practice is daily, regular or available for whenever you need. Each meditation is designed to encourage deeper states of relaxation, reducing feelings of tension, stress or anxiety and optimally returning you to a more harmonious state in mind, body, soul and spirit.',
    duration: '', fileCount: 8,
    features: ['Encourages deeper states of relaxation and reduced feelings of tension, stress or anxiety','Suitable for people beginning meditation and those with an established practice','Fully guided MP3 audio with no background music','Designed to support greater harmony and balance in mind, body, soul and spirit'],
    delivery: 'The original product is described as eight downloadable MP3 files. Protected digital delivery is not configured in this preview yet.',
    safety: sharedSafety, terms: sharedTerms,
  },
  {
    sourceId: 1145, category: 'meditation-series', slug: 'gma_rest', shortName: 'Rest', name: 'Guided Meditation Audio MP3 | REST | Instant Digital Download',
    seoTitle: 'Rest — Guided Meditation Audio', seoDescription: 'Pause, relax and unwind with this soothing guided meditation and mindful body scan.',
    price: '£4.99', currency: 'GBP', amount: 4.99, image: images[1146], imageAlt: 'Rest guided meditation cover', gallery: [],
    paymentUrl: import.meta.env.PUBLIC_STRIPE_GMA_REST_URL?.trim() || '', summary: 'Pause for some moments to rest whilst you relax and unwind with this soothing, fully guided meditation. A mindful body scan with Source Light enabling you to relax each and every part of you, including body, mind and soul.',
    duration: '11:01', fileCount: 1, features: ['Fully guided meditation with a mindful body scan','Running time: 11:01','One MP3 digital file in the original product listing'],
    delivery: 'The original product is listed as one downloadable MP3 file. Protected digital delivery is not configured in this preview yet.', safety: sharedSafety, terms: sharedTerms,
  },
  {
    sourceId: 1200, category: 'meditation-series', slug: 'gma_restore', shortName: 'Restore', name: 'Guided Meditation Audio MP3 | RESTORE | Instant Digital Download',
    seoTitle: 'Restore — Guided Meditation Audio', seoDescription: 'Take an intentional pause and reconnect with this guided meditation for restoration.',
    price: '£4.99', currency: 'GBP', amount: 4.99, image: images[1151], imageAlt: 'Restore guided meditation cover', gallery: [],
    paymentUrl: import.meta.env.PUBLIC_STRIPE_GMA_RESTORE_URL?.trim() || '', summary: 'Take an intentional pause from your busy day and reconnect to Source Light that is always here to support and restore you whenever you need. This guided meditation is intended to restore your whole sense of being in body, mind, soul and spirit.',
    duration: '10:33', fileCount: 1, features: ['A guided pause to reconnect and restore','Running time: 10:33','One MP3 digital file in the original product listing'],
    delivery: 'The original product is listed as one downloadable MP3 file. Protected digital delivery is not configured in this preview yet.', safety: sharedSafety, terms: sharedTerms,
  },
  {
    sourceId: 1201, category: 'meditation-series', slug: 'gma_nourish', shortName: 'Nourish', name: 'Guided Meditation Audio MP3 | NOURISH | Instant Digital Download',
    seoTitle: 'Nourish — Guided Meditation Audio', seoDescription: 'Receive gentle nourishment on a guided meditation journey in nature.',
    price: '£4.99', currency: 'GBP', amount: 4.99, image: images[1152], imageAlt: 'Nourish guided meditation cover', gallery: [],
    paymentUrl: import.meta.env.PUBLIC_STRIPE_GMA_NOURISH_URL?.trim() || '', summary: 'Receive nourishment from this fully guided meditation as you journey in nature where gentle nourishment is waiting to absorb into your whole body and being.',
    duration: '10:44', fileCount: 1, features: ['A guided nature journey with gentle nourishment','Running time: 10:44','One MP3 digital file in the original product listing'],
    delivery: 'The original product is listed as one downloadable MP3 file. Protected digital delivery is not configured in this preview yet.', safety: sharedSafety, terms: sharedTerms,
  },
  {
    sourceId: 1205, category: 'meditation-series', slug: 'gma_grounding', shortName: 'Grounding', name: 'Guided Meditation Audio MP3 | GROUNDING | Instant Digital Download',
    seoTitle: 'Grounding — Guided Meditation Audio', seoDescription: 'Connect with nature and the earth in this fully guided grounding meditation.',
    price: '£4.99', currency: 'GBP', amount: 4.99, image: images[1154], imageAlt: 'Grounding guided meditation cover', gallery: [],
    paymentUrl: import.meta.env.PUBLIC_STRIPE_GMA_GROUNDING_URL?.trim() || '', summary: 'Inspired by the earth’s loving presence, this fully guided meditation provides a connection to nature and the earth, bringing you into a greater sense of calming presence with yourself. Anytime you need to ground, this is a great resource to do so!',
    duration: '10:05', fileCount: 1, features: ['A guided connection to nature and the earth','Running time: 10:05','One MP3 digital file in the original product listing'],
    delivery: 'The original product is listed as one downloadable MP3 file. Protected digital delivery is not configured in this preview yet.', safety: sharedSafety, terms: sharedTerms,
  },
  {
    sourceId: 1206, category: 'meditation-series', slug: 'gma_relaxing_into_dreams', shortName: 'Relaxing into Dreams', name: 'Guided Meditation Audio MP3 | RELAXING INTO DREAMS | Instant Digital Download',
    seoTitle: 'Relaxing into Dreams — Guided Meditation Audio', seoDescription: 'Unwind beneath a starry night sky and prepare for peaceful sleep with this guided meditation.',
    price: '£4.99', currency: 'GBP', amount: 4.99, image: images[1155], imageAlt: 'Relaxing into Dreams guided meditation cover', gallery: [],
    paymentUrl: import.meta.env.PUBLIC_STRIPE_GMA_RELAXING_INTO_DREAMS_URL?.trim() || '', summary: 'Take a breath and get ready for a starry night sky to soothe you into sleep. This fully guided meditation invites you to relax and unwind from the day and prepare for a restful, peaceful sleep. Great for calming a busy mind, soothing feelings of overwhelm or over stimulation from your day.',
    duration: '10:42', fileCount: 1, features: ['A soothing guided meditation to help you unwind and prepare for sleep','Running time: 10:42','One MP3 digital file in the original product listing'],
    delivery: 'The original product is listed as one downloadable MP3 file. Protected digital delivery is not configured in this preview yet.', safety: sharedSafety, terms: sharedTerms,
  },
  {
    sourceId: 1207, category: 'meditation-series', slug: 'gma_the_inner_child', shortName: 'The Inner Child', name: 'Guided Meditation Audio MP3 | THE INNER CHILD | Instant Digital Download',
    seoTitle: 'The Inner Child — Guided Meditation Audio', seoDescription: 'Meet your inner child on a short guided journey in nature.',
    price: '£4.99', currency: 'GBP', amount: 4.99, image: images[1156], imageAlt: 'The Inner Child guided meditation cover', gallery: [],
    paymentUrl: import.meta.env.PUBLIC_STRIPE_GMA_THE_INNER_CHILD_URL?.trim() || '', summary: 'This guided meditation takes you on a journey to meet your inner child and invite them on a short adventure in nature. Great for connecting to younger versions of yourself who wish to be seen, heard and have a playful exchange with. You may be surprised, delighted and touched by which version shows up…your inner child awaits you!',
    duration: '11:25', fileCount: 1, features: ['A guided nature journey to meet and connect with your inner child','Running time: 11:25','One MP3 digital file in the original product listing'],
    delivery: 'The original product is listed as one downloadable MP3 file. Protected digital delivery is not configured in this preview yet.', safety: sharedSafety, terms: sharedTerms,
  },
  {
    sourceId: 1208, category: 'meditation-series', slug: 'gma_higher_wisdom', shortName: 'Higher Wisdom', name: 'Guided Meditation Audio MP3 | HIGHER WISDOM | Instant Digital Download',
    seoTitle: 'Higher Wisdom — Guided Meditation Audio', seoDescription: 'Connect with your inner wisdom through this fully guided meditation.',
    price: '£4.99', currency: 'GBP', amount: 4.99, image: images[1157], imageAlt: 'Higher Wisdom guided meditation cover', gallery: [],
    paymentUrl: import.meta.env.PUBLIC_STRIPE_GMA_HIGHER_WISDOM_URL?.trim() || '', summary: 'The answers you seek are already inside of you! Sometimes they are inaccessible, you feel blocked, stuck or unsure what to do. Consulting your inner wisdom that can also be thought of as connecting to your Higher Self, Source, the Universe, God, to have an intentional space to enable a message or answer to come through. This meditation will guide you on a journey to connect to your Higher Wisdom and see what is waiting to come through. Recommended for regular listening whenever you feel you need to receive guidance and insight.',
    duration: '11:29', fileCount: 1, features: ['A guided journey to connect with your Higher Wisdom','Running time: 11:29','One MP3 digital file in the original product listing'],
    delivery: 'The original product is listed as one downloadable MP3 file. Protected digital delivery is not configured in this preview yet.', safety: sharedSafety, terms: sharedTerms,
  },
  {
    sourceId: 1203, category: 'meditation-series', slug: 'gma_rebalance', shortName: 'Rebalance', name: 'Guided Meditation Audio MP3 | REBALANCE | Instant Digital Download',
    seoTitle: 'Rebalance — Guided Meditation Audio', seoDescription: 'Return to balance with this mindful, heart-centred guided meditation.',
    price: '£4.99', currency: 'GBP', amount: 4.99, image: images[1153], imageAlt: 'Rebalance guided meditation cover', gallery: [],
    paymentUrl: import.meta.env.PUBLIC_STRIPE_GMA_REBALANCE_URL?.trim() || '', summary: 'A mindful, heart centred meditation that brings you back into balance in body, mind and soul. Become soothed by this fully guided meditation to be in mindful presence with the breath, body and unwind into gentle relaxation for the rest of your day or evening or night.',
    duration: '11:43', fileCount: 1, features: ['A mindful, heart-centred meditation for balance and gentle relaxation','Running time: 11:43','One MP3 digital file in the individual product listing'],
    delivery: 'The original product is listed as one downloadable MP3 file. Protected digital delivery is not configured in this preview yet.', safety: sharedSafety, terms: sharedTerms,
  },
] as const;

export type Product = (typeof products)[number];
