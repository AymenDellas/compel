import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDirectory = path.join(process.cwd(), 'content', 'articles');

export interface ArticleData {
  slug: string;
  contentHtml?: string;
  title?: string;
  description?: string;
  excerpt?: string;
  date?: string;
  updated?: string;
  [key: string]: any;
}

function normalizeFrontmatter(data: Record<string, any>) {
  const normalizeDate = (value: unknown) =>
    value instanceof Date ? value.toISOString().slice(0, 10) : typeof value === 'string' ? value : undefined;

  return {
    ...data,
    title: typeof data.title === 'string'
      ? data.title.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      : undefined,
    date: normalizeDate(data.date),
    updated: normalizeDate(data.updated),
  };
}

export async function getArticleBySlug(slug: string): Promise<ArticleData> {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Parse the markdown file
  const matterResult = matter(fileContents);

  // Convert markdown to HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...normalizeFrontmatter(matterResult.data as Record<string, any>),
  };
}

export function getAllArticles(): ArticleData[] {
  let fileNames: string[] = [];
  try {
    fileNames = fs.readdirSync(articlesDirectory);
  } catch (error) {
    return [];
  }

  const allArticlesData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        slug,
        ...normalizeFrontmatter(matterResult.data as Record<string, any>),
      };
    });

  return allArticlesData;
}
