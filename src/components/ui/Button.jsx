import React from 'react';

export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
