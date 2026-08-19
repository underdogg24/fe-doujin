import { Metadata } from 'next';
import { mangaApi } from '@/lib/api';
import { MangaListItem } from '@/types';
import MangaCard from '@/components/MangaCard';
import Pagination from '@/components/Pagination';
import FilterSidebar from '@/components/FilterSidebar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Manga Terbaru | Doujin Frontend',
};

export const dynamic = 'force-dynamic';

interface MangaListPageProps {
  searchParams: Promise<{
    page?: string;
    query?: string;
    type?: string;
    genre?: string;
    sort?: string;
  }>;
}

export default async function MangaListPage({ searchParams }: MangaListPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const query = params.query || '';
  const type = params.type || '';
  const genre = params.genre || '';
  const sort = params.sort || 'latest_chapter';
  const limit = 24;

  const [manga, genres] = await Promise.all([
    mangaApi.list({ page, query, type, genre, sort, limit }),
    mangaApi.genres().catch(() => []),
  ]);

  const hasNext = manga.length === limit;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-5xl uppercase leading-none tracking-wide text-ink dark:text-bone sm:text-6xl">
              {query ? `"${query}"` : 'MANGA'}<span className="text-neon">.</span>
            </h1>
            <p className="mt-2 font-sans text-sm font-semibold text-ink/70 dark:text-bone/70">
              {manga.length} title{manga.length !== 1 && 's'} on this page.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <FilterSidebar genres={genres} basePath="/manga" />

          <section>
            {manga.length === 0 ? (
              <div className="border-2 border-ink bg-bone p-10 text-center shadow-brutal dark:border-bone dark:bg-ink dark:shadow-brutal-white">
                <p className="font-display text-2xl uppercase tracking-wide text-ink dark:text-bone">
                  NOTHING FOUND
                </p>
                <p className="mt-2 font-sans text-sm text-ink/70 dark:text-bone/70">
                  Try adjusting your filters or search terms.
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
                  basePath="/manga"
                  searchParams={{ query, type, genre, sort }}
                />
              </>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}