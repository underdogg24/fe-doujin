import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Flame, Sparkles } from 'lucide-react';
import { mangaApi, videoApi } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Doujin Frontend - Manga & Video Viewer',
  description: 'Manga dari doujin.desu.xxx & Video dari nekopoi.care',
};

export const dynamic = 'force-dynamic';

interface MangaItem {
  title: string;
  slug: string;
  thumb: string;
  rating: number | null;
  type: string;
  status: string | null;
  latestChapter: number | null;
}

interface VideoItem {
  title: string;
  slug: string;
  thumb: string;
  date: string;
}

export default async function HomePage() {
  const [manga, video] = await Promise.all([
    mangaApi.list({ page: 1, limit: 20 }),
    videoApi.list(1),
  ]);

  const hero = manga[0];
  const featured = manga.slice(0, 20);

  return (
    <>
      <Navbar />
      <main className="bg-bone font-sans text-ink dark:bg-ink dark:text-bone">
        {/* ── HERO SPOTLIGHT ─────────────────────────────── */}
        {hero && (
          <section className="border-b-2 border-ink dark:border-bone">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[320px_1fr] md:items-center md:py-16">
              <div className="relative mx-auto w-60 sm:w-72 md:w-full">
                <div className="relative aspect-[2/3] w-full overflow-hidden border-2 border-ink shadow-brutal dark:border-bone dark:shadow-brutal-white">
                  {hero.thumb ? (
                    <Image
                      src={hero.thumb}
                      alt={hero.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 240px, 320px"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-neon/20 text-4xl">?</div>
                  )}
                </div>
                <span className="absolute -right-3 -top-3 rotate-6 border-2 border-ink bg-neon px-2 py-1 font-display text-sm tracking-widest text-ink shadow-brutal-sm dark:border-bone">
                  FEATURED
                </span>
              </div>

              <div>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 border-2 border-ink bg-ink px-2 py-1 font-sans text-xs font-bold uppercase tracking-wider text-bone shadow-brutal-sm dark:border-bone dark:bg-bone dark:text-ink">
                    <Flame size={14} /> Trending
                  </span>
                  {hero.type && (
                    <span className="border-2 border-ink bg-bone px-2 py-1 font-sans text-xs font-bold uppercase tracking-wider text-ink shadow-brutal-sm dark:border-bone dark:bg-ink dark:text-bone">
                      {hero.type}
                    </span>
                  )}
                  {hero.rating && (
                    <span className="border-2 border-ink bg-neon px-2 py-1 font-sans text-xs font-bold uppercase tracking-wider text-ink shadow-brutal-sm dark:border-bone">
                      ★ {hero.rating}
                    </span>
                  )}
                </div>

                <h1 className="font-display text-5xl leading-none tracking-wide text-ink sm:text-6xl md:text-7xl dark:text-bone">
                  {hero.title.split(' ').slice(0, 3).join(' ')}
                  <span className="block text-outline-neon dark:text-outline-neon">
                    {hero.title.split(' ').slice(3).join(' ') || 'COMICS'}
                  </span>
                </h1>

                <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-ink/80 dark:text-bone/70">
                  Jelajahi koleksi doujinshi, manga, dan manhwa terbaru. Baca langsung di
                  browser — gratis, cepat, dan tanpa iklan mengganggu.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/manga/${hero.slug}`}
                    className="btn-press inline-flex items-center gap-2 border-2 border-ink bg-neon px-6 py-3 font-sans text-sm font-bold uppercase tracking-wider text-ink shadow-brutal dark:border-bone dark:text-ink"
                  >
                    Read Now <ChevronRight size={18} />
                  </Link>
                  <Link
                    href="/manga/genres"
                    className="btn-press inline-flex items-center gap-2 border-2 border-ink bg-bone px-6 py-3 font-sans text-sm font-bold uppercase tracking-wider text-ink shadow-brutal dark:border-bone dark:bg-ink dark:text-bone"
                  >
                    Browse All
                  </Link>
                </div>

                {hero.latestChapter != null && (
                  <p className="mt-4 font-sans text-xs font-semibold uppercase tracking-wider text-ink/60 dark:text-bone/60">
                    Ch. {hero.latestChapter} tersedia
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── LATEST UPDATES GRID ─────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="inline-flex items-center gap-2 font-display text-3xl tracking-wide text-ink sm:text-4xl dark:text-bone">
              <Sparkles size={28} className="text-neon" /> LATEST UPDATES
            </h2>
            <Link
              href="/manga"
              className="inline-flex items-center gap-1 border-2 border-ink bg-bone px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-ink shadow-brutal-sm transition-all hover:translate-x-0.5 hover:translate-y-0.5 dark:border-bone dark:bg-ink dark:text-bone"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {featured.map((item: MangaItem) => (
              <Link
                key={item.slug}
                href={`/manga/${item.slug}`}
                className="card-brutal block border-2 border-ink bg-ink shadow-brutal dark:border-bone"
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden">
                  {item.thumb ? (
                    <Image
                      src={item.thumb}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-neon/20 text-4xl">?</div>
                  )}
                  {item.rating && (
                    <span className="absolute right-2 top-2 border-2 border-ink bg-neon px-2 py-0.5 font-sans text-xs font-bold text-ink shadow-brutal-sm dark:border-bone">
                      ★ {item.rating}
                    </span>
                  )}
                  <span className="absolute bottom-0 left-0 right-0 bg-ink/80 px-2 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-bone dark:bg-bone/90 dark:text-ink">
                    {item.type || 'Manga'}
                    {item.latestChapter != null ? ` · Ch. ${item.latestChapter}` : ''}
                  </span>
                </div>
                <div className="border-t-2 border-ink bg-bone p-3 dark:border-bone dark:bg-ink">
                  <h3 className="line-clamp-2 font-sans text-sm font-semibold leading-snug text-ink dark:text-bone">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── LATEST VIDEOS CAROUSEL ─────────────────────────── */}
        {video.videos.length > 0 && (
          <section className="border-t-2 border-ink bg-ink py-12 dark:border-bone dark:bg-bone">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h2 className="font-display text-3xl tracking-wide text-bone dark:text-ink">
                  <span className="text-neon">VIDEO</span> HIGHLIGHTS
                </h2>
                <Link
                  href="/video"
                  className="inline-flex items-center gap-1 border-2 border-bone bg-transparent px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-bone shadow-brutal-white transition-all hover:translate-x-0.5 hover:translate-y-0.5 dark:border-ink dark:bg-transparent dark:text-ink"
                >
                  View All <ChevronRight size={16} />
                </Link>
              </div>

              <div className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
                {video.videos.slice(0, 10).map((item: VideoItem) => (
                  <Link
                    key={item.slug}
                    href={`/video/${item.slug}`}
                    className="card-brutal block w-56 shrink-0 snap-start border-2 border-bone bg-ink dark:border-ink dark:bg-bone"
                  >
                    <div className="relative aspect-video w-full overflow-hidden">
                      {item.thumb ? (
                        <Image
                          src={item.thumb}
                          alt={item.title}
                          fill
                          sizes="224px"
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div className="grid h-full w-full place-items-center bg-neon/20">?</div>
                      )}
                      <span className="absolute bottom-2 left-2 grid h-9 w-9 place-items-center border-2 border-ink bg-neon text-ink shadow-brutal-sm dark:border-bone">
                        ▶
                      </span>
                    </div>
                    <div className="border-t-2 border-bone p-3 dark:border-ink">
                      <h3 className="line-clamp-2 font-sans text-sm font-semibold leading-snug text-bone dark:text-ink">
                        {item.title}
                      </h3>
                      {item.date && (
                        <p className="mt-1 font-sans text-xs text-bone/60 dark:text-ink/60">
                          {item.date}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </main>
    </>
  );
}