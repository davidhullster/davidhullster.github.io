import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  content: string;
  [key: string]: any;
}

export function getAllPosts(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.markdown'))
    .map((fileName) => {
      const fileSlug = fileName.replace(/\.(md|markdown)$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: data.slug || fileSlug,
        content,
        title: data.title || fileSlug,
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        ...data,
      } as PostData;
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): PostData | null {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(gfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}
