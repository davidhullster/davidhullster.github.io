'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Search as SearchIcon, Calendar, Tag, ChevronRight, X } from 'lucide-react';
import Fuse from 'fuse.js';

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  content: string;
}

export const BlogExplorer: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const [query, setQuery] = useState('');

  const fuse = useMemo(() => new Fuse(posts, {
    keys: ['title', 'content', 'tags'],
    threshold: 0.3,
  }), [posts]);

  const filteredPosts = useMemo(() => {
    if (!query) return posts;
    return fuse.search(query).map(result => result.item);
  }, [query, posts, fuse]);

  return (
    <div className="w-full">
      <div className="relative mb-12 animate-in fade-in slide-in-from-top-4 duration-700 delay-100">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-white/30" />
        </div>
        <input
          type="text"
          placeholder="Search articles, tags, or topics..."
          className="w-full glass py-5 pl-16 pr-12 rounded-3xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-6 flex items-center text-white/30 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="grid gap-8">
        {filteredPosts.map((post, index) => (
          <Link 
            key={post.slug} 
            href={`/posts/${post.slug}`}
            className="group block glass p-8 rounded-3xl transition-all duration-300 glass-hover animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <article>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/40 mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(post.date), 'MMMM d, yyyy')}
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4" />
                    {post.tags.slice(0, 3).join(', ')}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-3">
                    {post.title}
                  </h2>
                  <p className="text-white/70 line-clamp-2 leading-relaxed">
                    {post.excerpt || post.content.substring(0, 160).replace(/[#*`]/g, '') + '...'}
                  </p>
                </div>
                <ChevronRight className="w-6 h-6 text-white/20 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </div>
            </article>
          </Link>
        ))}

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 glass rounded-3xl animate-in zoom-in duration-300">
            <p className="text-white/40 text-lg">No matches found for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
};
