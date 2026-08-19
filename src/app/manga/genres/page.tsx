import { Metadata } from 'next';
import Link from 'next/link';
import { mangaApi } from '@/lib/api';
import { MangaListItem } from '@/types';
import MangaCard from '@/components/MangaCard';
import Pagination from '@/components/Pagination';
import FilterSidebar from '@/components/FilterSidebar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Genre Manga | Doujin Frontend',
};

interface GenresPageProps {
  searchParams: Promise<{ genre?: string; page?: string; type?: string; sort?: string; query?: string }>;
}

export default async function GenresPage({ searchParams }: GenresPageProps) {
  const params = await searchParams;
  const genre = params.genre || '';
  const type = params.type || '';
  const sort = params.sort || 'latest_chapter';
  const query = params.query || '';
  const page = parseInt(params.page || '1');

  const [genres, manga] = await Promise.all([
    mangaApi.genres(),
    genre ? mangaApi.list({ page, genre, type, sort, query, limit: 24 }).catch(() => []) : Promise.resolve([]),
  ]);

  const hasNext = manga.length === 24;
  const activeGenre = genres.find((g: { slug: string }) => g.slug === genre);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="font-display text-5xl uppercase leading-none tracking-wide text-ink dark:text-bone sm:text-6xl">
            GENRES<span className="text-neon">.</span>
          </h1>
          <p className="mt-2 font-sans text-sm font-semibold text-ink/70 dark:text-bone/70">
            Browse {genres.length} genres — pick one to dive in.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <FilterSidebar genres={genres} basePath="/manga/genres" />

          <section>
            {!genre ? (
              <>
                <h2 className="mb-4 font-display text-3xl uppercase tracking-wide text-ink dark:text-bone">
                  ALL GENRES<span className="text-neon">.</span>
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {genres.map((g: { slug: string; name: string; count: number }) => (
                    <Link
                      key={g.slug}
                      href={`/manga/genres?genre=${g.slug}`}
                      className="card-brutal group flex flex-col justify-between gap-6 border-2 border-ink bg-bone p-5 shadow-brutal dark:border-bone dark:bg-ink dark:shadow-brutal-white"
                    >
                      <h3 className="font-display text-2xl uppercase leading-none tracking-wide text-ink transition-colors group-hover:text-neon dark:text-bone">
                        {g.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-xs font-bold uppercase tracking-wider text-ink/60 dark:text-bone/60">
                          {g.count} manga
                        </span>
                        <span className="text-neon transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-3xl uppercase tracking-wide text-ink dark:text-bone">
                    {activeGenre?.name || genre}
                    {type && <span className="text-neon"> · {type}</span>}
                  </h2>
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-ink/60 dark:text-bone/60">
                    {manga.length} result{manga.length !== 1 && 's'}
                  </span>
                </div>

                {manga.length === 0 ? (
                  <div className="border-2 border-ink bg-bone p-10 text-center shadow-brutal dark:border-bone dark:bg-ink dark:shadow-brutal-white">
                    <p className="font-display text-2xl uppercase tracking-wide text-ink dark:text-bone">
                      NOTHING FOUND
                    </p>
                    <p className="mt-2 font-sans text-sm text-ink/70 dark:text-bone/70">
                      Tidak ada manga di genre ini dengan filter tersebut.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4" role="list" aria-label="Daftar manga">
                      {manga.map((item: MangaListItem) => (
                        <MangaCard key={item.slug} manga={item} />
                      ))}
                    </div>

                    <Pagination
                      currentPage={page}
                      hasNext={hasNext}
                      basePath="/manga/genres"
                      searchParams={{ genre, type, sort, query }}
                    />
                  </>
                )}
              </>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}