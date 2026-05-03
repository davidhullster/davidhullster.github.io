import { getPostBySlug, getAllPosts, markdownToHtml } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Calendar, Tag, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.content);

  return (
    <article className="max-w-3xl mx-auto px-4 py-20 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12 group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to articles
      </Link>

      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-4 text-sm text-white/40 mb-6">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {format(new Date(post.date), 'MMMM d, yyyy')}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-1.5">
              <Tag className="w-4 h-4" />
              {post.tags.join(', ')}
            </div>
          )}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
          {post.title}
        </h1>
      </header>

      <div className="glass p-8 sm:p-12 rounded-3xl overflow-hidden">
        <div 
          className="prose prose-invert prose-emerald max-w-none prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </article>
  );
}
