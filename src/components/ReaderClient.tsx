'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, Settings2 } from 'lucide-react';
import { ChapterImages } from '@/types';

export default function ReaderClient({ chapter }: { chapter: ChapterImages }) {
  const [brightness, setBrightness] = useState(100);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-40 border-b-2 border-bone/20 bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            href={`/manga/${chapter.mangaSlug}`}
            className="btn-press inline-flex items-center gap-2 border-2 border-bone bg-bone px-3 py-2 font-sans text-xs font-bold uppercase tracking-wider text-ink shadow-brutal-neon-sm transition-colors hover:bg-neon"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Back to Detail</span>
            <span className="sm:hidden">Back</span>
          </Link>

          <div className="min-w-0 text-center">
            <p className="truncate font-display text-lg leading-none tracking-wide text-bone sm:text-xl">
              {chapter.mangaTitle}
            </p>
            <p className="mt-0.5 font-sans text-[11px] font-bold uppercase tracking-widest text-neon">
              {chapter.title}
            </p>
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label="Reader settings"
              onClick={() => setSettingsOpen((v) => !v)}
              className="btn-press grid h-10 w-10 place-items-center border-2 border-bone bg-bone text-ink shadow-brutal-neon-sm transition-colors hover:bg-neon"
            >
              <Settings2 size={17} />
            </button>

            {settingsOpen && (
              <div className="absolute right-0 top-12 w-56 border-2 border-bone bg-bone p-4 shadow-brutal-neon">
                <p className="mb-3 font-sans text-xs font-bold uppercase tracking-widest text-ink">
                  Brightness
                </p>
                <input
                  type="range"
                  min={40}
                  max={130}
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full accent-neon"
                />
                <div className="mt-2 flex items-center justify-between font-sans text-xs font-bold uppercase tracking-wider text-ink/70">
                  <span>Dimmer</span>
                  <span>{brightness}%</span>
                  <span>Brighter</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ filter: `brightness(${brightness / 100})` }}>
        {chapter.images.map((imgUrl: string, index: number) => (
          <div key={index} className="relative mx-auto max-w-4xl">
            <span className="absolute left-2 top-2 z-10 border-2 border-bone bg-ink/80 px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-widest text-bone">
              Pg {index + 1} / {chapter.images.length}
            </span>
            <img
              src={`/api/proxy-image?url=${encodeURIComponent(imgUrl)}`}
              alt={`${chapter.title} - Halaman ${index + 1}`}
              loading="lazy"
              className="w-full border-b-2 border-bone/20"
            />
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <Link
          href={`/manga/${chapter.mangaSlug}`}
          className="btn-press inline-flex items-center justify-center gap-2 border-[3px] border-bone bg-bone px-4 py-4 font-display text-xl uppercase tracking-wide text-ink shadow-brutal-neon transition-colors hover:bg-neon w-full"
        >
          <ArrowLeft size={20} />
          <span className="text-base sm:text-xl">Back to Chapter List</span>
        </Link>
      </div>
    </>
  );
}