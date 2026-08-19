'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Genre } from '@/types';

interface FilterSidebarProps {
  genres: Genre[];
  basePath: string;
}

const TYPE_OPTIONS = [
  { slug: '', name: 'Semua' },
  { slug: 'doujinshi', name: 'Doujinshi' },
  { slug: 'manga', name: 'Manga' },
  { slug: 'manhwa', name: 'Manhwa' },
];

const SORT_OPTIONS = [
  { key: 'latest_chapter', label: 'Latest Update' },
  { key: 'views', label: 'Most Popular' },
  { key: 'rating', label: 'Top Rated' },
];

export default function FilterSidebar({ genres, basePath }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get('query') || '';
  const type = searchParams.get('type') || '';
  const genre = searchParams.get('genre') || '';
  const sort = searchParams.get('sort') || 'latest_chapter';

  const buildHref = (overrides: Record<string, string | null>) => {
    const params = new URLSearchParams();
    const current = { query, type, genre, sort };
    const merged = { ...current, ...overrides };
    Object.entries(merged).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    return `${basePath}${params.toString() ? `?${params.toString()}` : ''}`;
  };

  const activeCount = [query, type, genre].filter(Boolean).length + (sort !== 'latest_chapter' ? 1 : 0);

  return (
    <aside className="h-fit border-2 border-ink bg-bone p-4 shadow-brutal dark:border-bone dark:bg-ink dark:shadow-brutal-white lg:sticky lg:top-24">
      <div className="mb-2 flex items-center gap-2 font-sans text-sm font-bold uppercase tracking-wider text-ink dark:text-bone">
        <SlidersHorizontal size={16} className="text-neon" /> Filters
      </div>

      <div className="mb-5">
        <label className="mb-2 block font-sans text-xs font-bold uppercase tracking-widest text-ink/60 dark:text-bone/60">
          Search
        </label>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const q = new FormData(e.currentTarget).get('q') as string;
            router.push(buildHref({ query: q || null }));
          }}
        >
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/50 dark:text-bone/50"
            />
            <input
              name="q"
              defaultValue={query}
              placeholder="Cari judul / author..."
              className="w-full border-2 border-ink bg-bone py-2.5 pl-9 pr-8 font-sans text-sm text-ink placeholder:text-ink/40 outline-none focus:bg-neon/10 dark:border-bone dark:bg-ink dark:text-bone dark:placeholder:text-bone/40"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => router.push(buildHref({ query: null }))}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-ink/60 hover:text-neon dark:text-bone/60"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="mb-5">
        <label className="mb-2 block font-sans text-xs font-bold uppercase tracking-widest text-ink/60 dark:text-bone/60">
          Type
        </label>
        <div className="flex flex-wrap gap-2">
          {TYPE_OPTIONS.map((t) => (
            <button
              key={t.slug || 'all'}
              type="button"
              onClick={() => router.push(buildHref({ type: t.slug || null }))}
              className={`border-2 border-ink px-3 py-1.5 font-sans text-xs font-bold uppercase tracking-wider transition-colors ${
                type === t.slug
                  ? 'bg-neon text-ink'
                  : 'bg-bone text-ink hover:bg-neon/30 dark:bg-ink dark:text-bone'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label className="mb-2 block font-sans text-xs font-bold uppercase tracking-widest text-ink/60 dark:text-bone/60">
          Genre
        </label>
        <div className="flex max-h-56 flex-col gap-1 overflow-y-auto pr-1">
          <button
            type="button"
            onClick={() => router.push(buildHref({ genre: null }))}
            className={`flex items-center justify-between px-2 py-1.5 font-sans text-sm font-semibold transition-colors ${
              !genre
                ? 'bg-neon text-ink'
                : 'text-ink hover:bg-neon/20 dark:text-bone'
            }`}
          >
            <span>Semua Genre</span>
          </button>
          {genres.map((g) => (
            <button
              key={g.slug}
              type="button"
              onClick={() => router.push(buildHref({ genre: g.slug }))}
              className={`flex items-center justify-between gap-2 border-l-2 px-2 py-1.5 text-left font-sans text-sm font-semibold transition-colors ${
                genre === g.slug
                  ? 'border-neon bg-neon text-ink'
                  : 'border-transparent text-ink hover:border-neon hover:bg-neon/20 dark:text-bone'
              }`}
            >
              <span>{g.name}</span>
              <span className="text-[11px] font-bold text-ink/50 dark:text-bone/50">{g.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label className="mb-2 block font-sans text-xs font-bold uppercase tracking-widest text-ink/60 dark:text-bone/60">
          Sort by
        </label>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => router.push(buildHref({ sort: e.target.value }))}
            className="w-full cursor-pointer appearance-none border-2 border-ink bg-bone py-2.5 px-3 font-sans text-sm font-semibold text-ink outline-none focus:bg-neon/10 dark:border-bone dark:bg-ink dark:text-bone"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-neon">
            ▼
          </span>
        </div>
      </div>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={() => router.push(basePath)}
          className="w-full border-2 border-ink bg-ink py-2 font-sans text-xs font-bold uppercase tracking-wider text-bone transition-colors hover:bg-neon hover:text-ink dark:border-bone dark:bg-bone dark:text-ink dark:hover:bg-neon"
        >
          Reset Filters
        </button>
      )}
    </aside>
  );
}