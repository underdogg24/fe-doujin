import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { mangaApi } from '@/lib/api';
import { MangaDetail } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Calendar, Eye, Play, Star, User as UserIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const manga = await mangaApi.detail(slug);
    return { title: `${manga?.title || 'Manga'} | Doujin Frontend` };
  } catch {
    return { title: 'Manga tidak ditemukan | Doujin Frontend' };
  }
}

interface MangaDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function MangaDetailPage({ params }: MangaDetailPageProps) {
  const { slug } = await params;

  try {
    const manga = await mangaApi.detail(slug);

    if (!manga) notFound();

    const chapters = [...manga.chapters].reverse();

    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <Link
            href="/manga"
            className="mb-6 inline-block border-2 border-ink bg-bone px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-wider text-ink shadow-brutal-sm transition-all hover:translate-x-0.5 hover:translate-y-0.5 dark:border-bone dark:bg-ink dark:text-bone"
          >
            ← Back to Manga
          </Link>

          <section className="mb-10 grid gap-8 md:grid-cols-[320px_1fr]">
            <div className="mx-auto w-full max-w-[320px]">
              <div className="relative border-2 border-ink bg-bone p-2 shadow-brutal dark:border-bone dark:bg-ink dark:shadow-brutal-neon">
                {manga.thumb ? (
                  <Image
                    src={manga.thumb}
                    alt={manga.title}
                    width={300}
                    height={450}
                    className="aspect-[2/3] w-full border-2 border-ink object-cover dark:border-bone"
                    priority
                  />
                ) : (
                  <div className="skeleton aspect-[2/3] w-full border-2 border-ink dark:border-bone" />
                )}
                {manga.rating != null && (
                  <span className="absolute -right-3 -top-3 inline-flex rotate-6 items-center gap-1 border-2 border-ink bg-neon px-3 py-1 font-display text-xl leading-none tracking-wide text-ink shadow-brutal-sm dark:border-bone">
                    <Star size={16} className="fill-ink" /> {manga.rating}
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                {manga.genres.map((g: { name: string; slug: string }) => (
                  <Link
                    key={g.slug}
                    href={`/manga/genres?genre=${g.slug}`}
                    className="border-2 border-ink bg-bone px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-neon dark:border-bone dark:bg-ink dark:text-bone"
                  >
                    {g.name}
                  </Link>
                ))}
                <span
                  className={`border-2 border-ink px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider text-ink dark:border-bone dark:text-bone ${
                    manga.status ? 'bg-neon' : 'bg-bone dark:bg-ink'
                  }`}
                >
                  {manga.status || 'Unknown'}
                </span>
              </div>

              <h1 className="mt-4 font-display text-5xl uppercase leading-none tracking-wide text-ink dark:text-bone sm:text-6xl">
                {manga.title}
              </h1>
              {manga.altTitle && (
                <p className="mt-2 font-sans text-sm font-semibold text-ink/60 dark:text-bone/60">
                  {manga.altTitle}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm font-semibold text-ink/80 dark:text-bone/80">
                {manga.author && (
                  <span className="inline-flex items-center gap-2">
                    <UserIcon size={15} className="text-neon" /> {manga.author}
                  </span>
                )}
                {manga.artist && (
                  <span className="inline-flex items-center gap-2">
                    <BookOpen size={15} className="text-neon" /> {manga.artist}
                  </span>
                )}
                <span className="inline-flex items-center gap-2">
                  <Calendar size={15} className="text-neon" /> {manga.chapters.length} chapters
                </span>
                <span className="inline-flex items-center gap-2">
                  <Eye size={15} className="text-neon" /> {manga.views.toLocaleString()} views
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                {manga.chapters.length > 0 && (
                  <Link
                    href={`/read/${manga.chapters[0].id}`}
                    className="btn-press inline-flex items-center gap-2 border-[3px] border-ink bg-neon px-8 py-4 font-display text-xl uppercase tracking-wide text-ink shadow-brutal dark:border-bone dark:shadow-brutal-neon"
                  >
                    <Play size={22} fill="currentColor" />
                    Read First Chapter
                  </Link>
                )}
                <button
                  type="button"
                  className="btn-press inline-flex items-center gap-2 border-[3px] border-ink bg-bone px-8 py-4 font-display text-xl uppercase tracking-wide text-ink shadow-brutal transition-colors hover:bg-neon/20 dark:border-bone dark:bg-ink dark:text-bone dark:shadow-brutal-white"
                >
                  <BookmarkPlusIcon />
                  Add to Favorites
                </button>
              </div>
            </div>
          </section>

          {manga.synopsis && (
            <section className="mb-10">
              <h2 className="mb-4 font-display text-3xl uppercase tracking-wide text-ink dark:text-bone">
                SYNOPSIS<span className="text-neon">.</span>
              </h2>
              <div className="border-2 border-ink bg-bone p-6 shadow-brutal dark:border-bone dark:bg-ink dark:shadow-brutal-neon">
                <p className="whitespace-pre-line font-sans text-base leading-relaxed text-ink/85 dark:text-bone/85">
                  {manga.synopsis}
                </p>
              </div>
            </section>
          )}

          {manga.chapters.length > 0 && (
            <section>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-3xl uppercase tracking-wide text-ink dark:text-bone">
                  CHAPTERS<span className="text-neon">.</span>
                </h2>
                <span className="font-sans text-sm font-bold uppercase tracking-wider text-ink/60 dark:text-bone/60">
                  {manga.chapters.length} total
                </span>
              </div>

              <div className="max-h-[480px] overflow-y-auto border-2 border-ink bg-bone shadow-brutal dark:border-bone dark:bg-ink dark:shadow-brutal-neon">
                {chapters.map((ch: { id: string; number: number | null; title: string; date: string }, i) => (
                  <Link
                    key={ch.id}
                    href={`/read/${ch.id}`}
                    className={`group flex items-center justify-between gap-4 border-b-2 border-ink/70 p-4 font-sans transition-colors last:border-b-0 hover:bg-neon/10 dark:border-bone/70 ${
                      i === 0 ? 'bg-neon/15' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="grid h-8 w-8 shrink-0 place-items-center border-2 border-ink bg-bone font-display text-lg text-ink dark:border-bone dark:bg-ink dark:text-bone">
                        {ch.number ?? '—'}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-ink transition-colors group-hover:text-neon dark:text-bone">
                          {ch.title ? `Chapter ${ch.number}: ${ch.title}` : `Chapter ${ch.number}`}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 text-xs font-semibold text-ink/60 dark:text-bone/60">
                      {ch.date}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>
        <Footer />
      </>
    );
  } catch {
    notFound();
  }
}

function BookmarkPlusIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
      <line x1="12" x2="12" y1="7" y2="11" />
      <line x1="15" x2="9" y1="9" y2="9" />
    </svg>
  );
}