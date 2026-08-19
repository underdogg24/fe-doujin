import { Metadata } from 'next';
import { videoApi } from '@/lib/api';
import { VideoListItem } from '@/types';
import VideoCard from '@/components/VideoCard';
import Pagination from '@/components/Pagination';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Video Terbaru | Doujin Frontend',
};

interface VideoListPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function VideoListPage({ searchParams }: VideoListPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');

  const data = await videoApi.list(page);
  const { videos, hasNext } = data;

  return (
    <>
      <Header />
      <main className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
        <h1 className="section-title">Video Terbaru</h1>

        {videos.length === 0 ? (
          <div className="error"><p>Tidak ada video ditemukan.</p></div>
        ) : (
          <>
            <div className="grid grid-cols-4" role="list" aria-label="Daftar video">
              {videos.map((item: VideoListItem) => (
                <VideoCard key={item.slug} video={item} />
              ))}
            </div>
            
            <Pagination
              currentPage={page}
              hasNext={hasNext}
              basePath="/video"
            />
          </>
        )}
      </main>
    </>
  );
}