import { Metadata } from 'next';
import { videoApi } from '@/lib/api';
import { VideoListItem } from '@/types';
import VideoCard from '@/components/VideoCard';
import Pagination from '@/components/Pagination';
import Header from '@/components/Header';

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
      <Header />
      <main className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
        <div className="section-header">
          <h1 className="section-title">
            {query ? `Hasil pencarian: "${query}"` : 'Cari Video'}
          </h1>
        </div>

        <form style={{ marginBottom: 24, maxWidth: 400 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Cari video..."
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: 8,
                border: '1px solid #333',
                background: '#1a1a1a',
                color: '#fff',
                fontSize: 14,
              }}
            />
            <button type="submit" className="btn btn-primary">Cari</button>
          </div>
        </form>

        {query && data.videos.length === 0 && (
          <div className="error"><p>Tidak ada hasil untuk pencarian ini.</p></div>
        )}

        {query && data.videos.length > 0 && (
          <>
            <div className="grid grid-cols-4" role="list">
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
      </main>
    </>
  );
}