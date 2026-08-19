import { Metadata } from 'next';
import { videoApi } from '@/lib/api';
import { VideoListItem } from '@/types';
import VideoCard from '@/components/VideoCard';
import Pagination from '@/components/Pagination';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cari Video | Doujin Frontend',
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const page = parseInt(params.page || '1');

  let data: { videos: VideoListItem[]; hasNext: boolean } = { videos: [], hasNext: false };

  if (query) {
    data = await videoApi.search(query, page);
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="mb-8 font-display text-5xl uppercase leading-none tracking-wide text-ink dark:text-bone sm:text-6xl">
          SEARCH<span className="text-neon">.</span>
        </h1>

        <form action="/video/search" method="get" className="mb-10 flex max-w-2xl gap-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/50 dark:text-bone/50"
            />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Cari video..."
              className="w-full border-2 border-ink bg-bone py-3 pl-9 pr-3 font-sans text-sm text-ink placeholder:text-ink/40 outline-none focus:bg-neon/10 dark:border-bone dark:bg-ink dark:text-bone dark:placeholder:text-bone/40"
            />
          </div>
          <button
            type="submit"
            className="btn-press border-2 border-ink bg-neon px-6 py-3 font-sans text-sm font-bold uppercase tracking-wider text-ink shadow-brutal-sm transition-colors hover:bg-bone dark:border-bone dark:shadow-brutal-neon"
          >
            Cari
          </button>
        </form>

        {query && data.videos.length === 0 && (
          <div className="border-2 border-ink bg-bone p-10 text-center shadow-brutal dark:border-bone dark:bg-ink dark:shadow-brutal-white">
            <p className="font-display text-2xl uppercase tracking-wide text-ink dark:text-bone">
              NO RESULTS FOR "{query}"
            </p>
            <p className="mt-2 font-sans text-sm text-ink/70 dark:text-bone/70">
              Tidak ada hasil untuk pencarian ini.
            </p>
          </div>
        )}

        {query && data.videos.length > 0 && (
          <>
            <p className="mb-4 font-sans text-sm font-bold uppercase tracking-wider text-ink/60 dark:text-bone/60">
              {data.videos.length} result{data.videos.length !== 1 && 's'} for "{query}"
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" role="list">
              {data.videos.map((item: VideoListItem) => (
                <VideoCard key={item.slug} video={item} />
              ))}
            </div>

            <Pagination
              currentPage={page}
              hasNext={data.hasNext}
              basePath="/video/search"
              searchParams={{ q: query }}
            />
          </>
        )}

        {!query && (
          <p className="font-sans text-sm font-semibold text-ink/60 dark:text-bone/60">
            Ketik kata kunci di atas untuk mencari video.
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}