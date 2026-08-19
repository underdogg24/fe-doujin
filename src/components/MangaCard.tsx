import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { MangaListItem } from '@/types';

interface MangaCardProps {
  manga: MangaListItem;
}

export default function MangaCard({ manga }: MangaCardProps) {
  return (
    <Link
      href={`/manga/${manga.slug}`}
      className="card-brutal group flex flex-col border-2 border-ink bg-bone shadow-brutal dark:border-bone dark:bg-ink dark:shadow-brutal-white"
    >
      <div className="relative aspect-[2/3] overflow-hidden border-b-2 border-ink dark:border-bone">
        {manga.thumb ? (
          <Image
            src={manga.thumb}
            alt={manga.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 400px) 50vw, (max-width: 800px) 33vw, (max-width: 1200px) 25vw, 20vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAGggJ/PchI7wAAAABJRU5ErkJggg=="
          />
        ) : (
          <div className="skeleton h-full w-full" />
        )}
        {manga.rating != null && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 border-2 border-ink bg-neon px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-ink shadow-brutal-sm dark:border-bone">
            <Star size={11} className="fill-ink" /> {manga.rating}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="font-display text-lg leading-tight tracking-wide text-ink dark:text-bone">
          {manga.title}
        </h3>
        <div className="mt-auto flex flex-wrap items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-wider text-ink/70 dark:text-bone/70">
          {manga.type && (
            <span className="border border-ink px-1.5 py-0.5 dark:border-bone">{manga.type}</span>
          )}
          {manga.status && (
            <span className="border border-ink px-1.5 py-0.5 dark:border-bone">{manga.status}</span>
          )}
          {manga.latestChapter != null && (
            <span className="border border-ink px-1.5 py-0.5 dark:border-bone">
              Ch. {manga.latestChapter}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}