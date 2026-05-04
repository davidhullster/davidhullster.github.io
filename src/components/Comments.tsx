'use client';

import { useEffect, useRef } from 'react';

export const Comments = () => {
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent duplicate script insertion
    if (commentRef.current?.querySelector('.giscus')) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'davidhullster/davidhullster.github.io');
    script.setAttribute('data-repo-id', ''); // USER: Fill this in after enabling Discussions
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', ''); // USER: Fill this in after enabling Discussions
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'transparent_dark');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    commentRef.current?.appendChild(script);
  }, []);

  return (
    <section className="mt-16 pt-16 border-t border-white/10">
      <div className="glass p-8 rounded-3xl overflow-hidden" ref={commentRef} id="comments">
        {/* Giscus will be injected here */}
        <div className="giscus-placeholder text-center text-white/40 text-sm">
          Loading comments...
        </div>
      </div>
    </section>
  );
};
