import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
      <div className="absolute top-0 -left-4 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob"></div>
      <div 
        className="absolute top-0 -right-4 w-72 h-72 sm:w-96 sm:h-96 bg-emerald-600 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob" 
        style={{ animationDelay: '2s' }}
      ></div>
      <div 
        className="absolute -bottom-8 left-20 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob" 
        style={{ animationDelay: '4s' }}
      ></div>
    </div>
  );
};
