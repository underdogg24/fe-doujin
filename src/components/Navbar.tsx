'use client';

import Link from 'next/link';
import { BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { href: '/manga', label: 'Manga' },
  { href: '/manga/genres', label: 'Genres' },
  { href: '/video', label: 'Video' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-bone/95 backdrop-blur dark:border-bone dark:bg-ink/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-2xl tracking-wide text-ink dark:text-bone"
        >
          <span className="grid h-9 w-9 place-items-center border-2 border-ink bg-neon text-ink shadow-brutal-sm dark:border-bone">
            <BookOpen size={20} />
          </span>
          DOUJIN<span className="text-neon">ZONE</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 font-sans text-sm font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-neon hover:text-ink dark:text-bone dark:hover:bg-neon dark:hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center border-2 border-ink bg-bone text-ink shadow-brutal-sm dark:border-bone dark:bg-ink dark:text-bone md:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          />
          <div className="absolute right-0 top-0 flex h-full w-72 flex-col border-l-2 border-ink bg-bone shadow-brutal dark:border-bone dark:bg-ink">
            <div className="flex items-center justify-between border-b-2 border-ink p-4 dark:border-bone">
              <span className="font-display text-xl tracking-wide text-ink dark:text-bone">
                MENU
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center border-2 border-ink text-ink shadow-brutal-sm dark:border-bone dark:text-bone"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-3 p-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-2 border-ink bg-bone px-4 py-3 font-sans text-lg font-bold uppercase tracking-wider text-ink shadow-brutal-sm transition-colors hover:bg-neon dark:border-bone dark:bg-ink dark:text-bone dark:hover:bg-neon dark:hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/manga/genres"
                onClick={() => setOpen(false)}
                className="mt-2 border-2 border-ink bg-neon px-4 py-3 text-center font-sans text-lg font-bold uppercase tracking-wider text-ink shadow-brutal-sm transition-all hover:translate-x-0.5 hover:translate-y-0.5"
              >
                Explore Now
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}