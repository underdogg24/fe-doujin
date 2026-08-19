import { Metadata } from 'next';
import { mangaApi } from '@/lib/api';
import { MangaListItem } from '@/types';
import MangaCard from '@/components/MangaCard';
import Pagination from '@/components/Pagination';
import Header from '@/components/Header';

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

  const { data: manga } = await mangaApi.list({ page, query, type, genre, sort, limit });
  
  // Determine hasNext by checking if we got full page
  const hasNext = manga.length === limit;

  return (
    <>
      <Header />
      <main className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
        <div className="section-header">
          <h1 className="section-title">
            {query ? `Hasil: "${query}"` : 'Manga Terbaru'}
          </h1>
        </div>

        {manga.length === 0 ? (
          <div className="error">
            <p>Tidak ada manga ditemukan.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-6" role="list" aria-label="Daftar manga">
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
      </main>
    </>
  );
}