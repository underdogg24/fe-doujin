import { Metadata } from 'next';
import { videoApi } from '@/lib/api';
import { VideoListItem } from '@/types';
import VideoCard from '@/components/VideoCard';
import Pagination from '@/components/Pagination';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Video Terbaru | Doujin Frontend',
};

interface VideoListPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function VideoListPage({ searchParams }: VideoListPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');

  const [data, categories] = await Promise.all([
    videoApi.list(page),
    videoApi.categories().catch(() => []),
  ]);
  const { videos, hasNext } = data;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-5xl uppercase leading-none tracking-wide text-ink dark:text-bone sm:text-6xl">
              VIDEO<span className="text-neon">.</span>
            </h1>
            <p className="mt-2 font-sans text-sm font-semibold text-ink/70 dark:text-bone/70">
              Latest uploads — fresh from the source.
            </p>
          </div>
          <Link
            href="/video/search"
            className="btn-press inline-flex items-center gap-2 border-2 border-ink bg-neon px-5 py-2.5 font-sans text-sm font-bold uppercase tracking-wider text-ink shadow-brutal-sm transition-colors hover:bg-bone dark:border-bone dark:shadow-brutal-neon"
          >
            <Search size={16} /> Search
          </Link>
        </div>

        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat: { slug: string; name: string }) => (
              <Link
                key={cat.slug}
                href={`/video/category/${cat.slug}`}
                className="border-2 border-ink bg-bone px-3 py-1.5 font-sans text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-neon dark:border-bone dark:bg-ink dark:text-bone dark:hover:bg-neon dark:hover:text-ink"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {videos.length === 0 ? (
          <div className="border-2 border-ink bg-bone p-10 text-center shadow-brutal dark:border-bone dark:bg-ink dark:shadow-brutal-white">
            <p className="font-display text-2xl uppercase tracking-wide text-ink dark:text-bone">
              NOTHING FOUND
            </p>
            <p className="mt-2 font-sans text-sm text-ink/70 dark:text-bone/70">
              Tidak ada video ditemukan.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" role="list" aria-label="Daftar video">
              {videos.map((item: VideoListItem) => (
                <VideoCard key={item.slug} video={item} />
              ))}
            </div>

            <Pagination currentPage={page} hasNext={hasNext} basePath="/video" />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}