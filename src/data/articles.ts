import {getCollection, type CollectionEntry} from 'astro:content';
import type {ImageMetadata} from 'astro';

export type ArticleEntry = CollectionEntry<'articles'>;
export type ArticleData = ArticleEntry['data'];
export type ArticleRecord = Omit<ArticleData, 'featuredImage'> & {featuredImage: ImageMetadata; entry: ArticleEntry};

const imageModules = import.meta.glob('../assets/articles/*', {eager: true, import: 'default'}) as Record<string, ImageMetadata>;
export async function getArticles(): Promise<ArticleRecord[]> {
  const entries = await getCollection('articles');
  return entries.map((entry) => {
    const featuredImage = imageModules['../assets/articles/' + entry.data.featuredImage];
    if (!featuredImage) throw new Error('Missing original featured image for article ' + entry.data.slug);
    return {...entry.data, featuredImage, entry};
  }).sort((a, b) => Date.parse(b.datePublished) - Date.parse(a.datePublished));
}

export async function getArticle(slug: string) {
  return (await getArticles()).find((article) => article.slug === slug);
}
