import { getAllPosts } from '@/lib/markdown';
import { BlogExplorer } from '@/components/BlogExplorer';

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="max-w-4xl mx-auto px-4 py-20 w-full">
      <header className="mb-16 text-center animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-6xl font-extrabold text-white mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/40">
          Scratches
        </h1>
        <p className="text-xl text-white/50 font-medium">
          Tips worth saving • A collection of thoughts and tutorials
        </p>
      </header>

      <BlogExplorer posts={posts} />

      <footer className="mt-20 text-center text-white/20 text-sm">
        <p>© {new Date().getFullYear()} David Hull. Built with Next.js & Glassmorphism.</p>
      </footer>
    </main>
  );
}
