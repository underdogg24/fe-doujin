import Link from 'next/link';
import { BookOpen, Globe, Rss } from 'lucide-react';

const FOOTER_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/manga', label: 'Manga' },
  { href: '/manga/genres', label: 'Genres' },
  { href: '/video', label: 'Video' },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink dark:border-bone">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-display text-2xl tracking-wide text-ink dark:text-bone"
            >
              <span className="grid h-9 w-9 place-items-center border-2 border-ink bg-neon text-ink shadow-brutal-sm dark:border-bone">
                <BookOpen size={20} />
              </span>
              DOUJIN<span className="text-neon">ZONE</span>
            </Link>
            <p className="mt-3 max-w-xs font-sans text-sm text-ink/70 dark:text-bone/70">
              Read freely. No ads. Just comics — neo-brutalist since day one.
            </p>
          </div>

          <nav className="flex flex-wrap gap-2">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-2 border-ink bg-bone px-3 py-1.5 font-sans text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-neon dark:border-bone dark:bg-ink dark:text-bone dark:hover:bg-neon dark:hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Website"
              className="grid h-10 w-10 place-items-center border-2 border-ink bg-bone text-ink shadow-brutal-sm transition-all hover:translate-x-0.5 hover:translate-y-0.5 dark:border-bone dark:bg-ink dark:text-bone"
            >
              <Globe size={18} />
            </a>
            <a
              href="#"
              aria-label="RSS"
              className="grid h-10 w-10 place-items-center border-2 border-ink bg-bone text-ink shadow-brutal-sm transition-all hover:translate-x-0.5 hover:translate-y-0.5 dark:border-bone dark:bg-ink dark:text-bone"
            >
              <Rss size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t-2 border-ink pt-4 dark:border-bone">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-ink/60 dark:text-bone/60">
            © 2026 DoujinZone — Read freely. No ads. Just comics.
          </p>
        </div>
      </div>
    </footer>
  );
}