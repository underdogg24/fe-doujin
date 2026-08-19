import { Metadata } from 'next';
import { videoApi } from '@/lib/api';
import { VideoListItem } from '@/types';
import VideoCard from '@/components/VideoCard';
import Pagination from '@/components/Pagination';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const catName = category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return { title: `${catName} | Doujin Frontend` };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = await params;
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam || '1');

  const validCategories = ['hentai', 'jav', '2d-animation', '3d-hentai', 'jav-cosplay'];
  if (!validCategories.includes(category)) {
    notFound();
  }

  const data = await videoApi.category(category, page);
  const { videos, hasNext } = data;
  const catName = category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Link
          href="/video"
          className="mb-6 inline-block border-2 border-ink bg-bone px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-wider text-ink shadow-brutal-sm transition-all hover:translate-x-0.5 hover:translate-y-0.5 dark:border-bone dark:bg-ink dark:text-bone"
        >
          ← Back to Video
        </Link>

        <div className="mb-8">
          <h1 className="font-display text-5xl uppercase leading-none tracking-wide text-ink dark:text-bone sm:text-6xl">
            {catName}<span className="text-neon">.</span>
          </h1>
          <p className="mt-2 font-sans text-sm font-semibold text-ink/70 dark:text-bone/70">
            {videos.length} video on this page.
          </p>
        </div>

        {videos.length === 0 ? (
          <div className="border-2 border-ink bg-bone p-10 text-center shadow-brutal dark:border-bone dark:bg-ink dark:shadow-brutal-white">
            <p className="font-display text-2xl uppercase tracking-wide text-ink dark:text-bone">
              NOTHING FOUND
            </p>
            <p className="mt-2 font-sans text-sm text-ink/70 dark:text-bone/70">
              Tidak ada video di kategori ini.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" role="list">
              {videos.map((item: VideoListItem) => (
                <VideoCard key={item.slug} video={item} />
              ))}
            </div>

            <Pagination
              currentPage={page}
              hasNext={hasNext}
              basePath={`/video/category/${category}`}
            />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}