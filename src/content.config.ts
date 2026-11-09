import {defineCollection} from 'astro:content';
import {z} from 'astro/zod';
import {glob} from 'astro/loaders';

const articles = defineCollection({
  loader: glob({pattern: '**/*.md', base: './src/content/articles'}),
  schema: z.object({
    id: z.string(), title: z.string(), slug: z.string(), path: z.string(),
    datePublished: z.string(), dateModified: z.string(), displayDate: z.string(),
    author: z.string(), readingTime: z.string(), featuredImage: z.string(), featuredImageAlt: z.string(),
    categories: z.array(z.string()), tags: z.array(z.string()), keyTakeaways: z.array(z.string()),
    excerpt: z.string(), seoTitle: z.string(), seoDescription: z.string(),
  }),
});

export const collections = {articles};
