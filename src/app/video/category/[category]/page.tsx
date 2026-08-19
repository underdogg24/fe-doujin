import { Metadata } from 'next';
import { videoApi } from '@/lib/api';
import { VideoListItem } from '@/types';
import VideoCard from '@/components/VideoCard';
import Pagination from '@/components/Pagination';
import Header from '@/components/Header';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const catName = category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
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
  const catName = category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <>
      <Header />
      <main className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
        <h1 className="section-title">Kategori: {catName}</h1>

        {videos.length === 0 ? (
          <div className="error"><p>Tidak ada video di kategori ini.</p></div>
        ) : (
          <>
            <div className="grid grid-cols-4" role="list">
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
    </>
  );
}