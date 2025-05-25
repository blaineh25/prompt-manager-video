'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Manager
        </Link>
        <nav className="space-x-6">
          <Link href="/" className="hover:text-gray-600 transition-colors">
            Home
          </Link>
          <Link href="/prompts" className="hover:text-gray-600 transition-colors">
            Prompts
          </Link>
        </nav>
      </div>
    </header>
  );
} 