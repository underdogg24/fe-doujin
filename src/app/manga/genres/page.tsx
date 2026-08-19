import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { mangaApi } from '@/lib/api';
import Header from '@/components/Header';
import Image from 'next/image';
import Pagination from '@/components/Pagination';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Genre Manga | Doujin Frontend',
};

interface GenresPageProps {
  searchParams: Promise<{ genre?: string; page?: string }>;
}

export default async function GenresPage({ searchParams }: GenresPageProps) {
  const params = await searchParams;
  const genre = params.genre || '';
  const page = parseInt(params.page || '1');

  const { data: genres } = await mangaApi.genres();
  let manga: Awaited<ReturnType<typeof mangaApi.list>>['data'] = [];
  let hasNext = false;

  if (genre) {
    const result = await mangaApi.list({ page, genre, limit: 24 });
    manga = result;
    hasNext = manga.length === 24;
  }

  return (
    <>
      <Header />
      <main className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
        <div className="section-header">
          <h1 className="section-title">Genre Manga</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 32 }}>
          <aside style={{ position: 'sticky', top: 80, height: 'fit-content' }}>
            <h3 style={{ marginBottom: 16, fontSize: 16 }}>Semua Genre</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 'calc(100vh - 160px)', overflow: 'auto' }}>
              {genres.map((g: { slug: string; name: string; count: number }) => (
                <a
                  key={g.slug}
                  href={`/manga/genres?genre=${g.slug}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    background: genre === g.slug ? 'rgba(229, 57, 53, 0.15)' : '#1a1a1a',
                    border: `1px solid ${genre === g.slug ? '#e53935' : '#333'}`,
                    borderRadius: 8,
                    color: genre === g.slug ? '#e53935' : '#e0e0e0',
                    transition: 'all 0.2s',
                  }}
                >
                  <span>{g.name}</span>
                  <span style={{ color: '#999', fontSize: 12 }}>{g.count}</span>
                </a>
              ))}
            </div>
          </aside>

          <div>
            {genre ? (
              <>
                <h2 style={{ marginBottom: 16 }}>Genre: {genres.find((g: { slug: string; name: string }) => g.slug === genre)?.name || genre}</h2>
                {manga.length === 0 ? (
                  <div className="error"><p>Tidak ada manga di genre ini.</p></div>
                ) : (
                  <>
                    <div className="grid grid-cols-6" role="list">
                      {manga.map((item: { title: string; slug: string; thumb: string; rating: number | null; type: string; status: string | null; latestChapter: number | null }) => (
                        <a
                          key={item.slug}
                          href={`/manga/${item.slug}`}
                          className="card"
                          style={{ display: 'block' }}
                        >
                          <div style={{ position: 'relative', aspectRatio: '2/3' }}>
                            {item.thumb ? (
                              <Image
                                src={item.thumb}
                                alt={item.title}
                                fill
                                className="card-thumb"
                                sizes="(max-width: 400px) 50vw, (max-width: 800px) 33vw, 20vw"
                                placeholder="blur"
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAGggJ/PchI7wAAAABJRU5ErkJggg=="
                              />
                            ) : (
                              <div className="skeleton" style={{ width: '100%', height: '100%' }} />
                            )}
                            {item.rating && (
                              <span className="badge" style={{ position: 'absolute', top: 8, right: 8 }}>
                                ★ {item.rating}
                              </span>
                            )}
                          </div>
                          <div className="card-body">
                            <h3 className="card-title">{item.title}</h3>
                            <div className="card-meta">
                              {item.type && <span>{item.type}</span>}
                              {item.status && <span>{item.status}</span>}
                              {item.latestChapter && <span>Ch. {item.latestChapter}</span>}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                    
                    <Pagination
                      currentPage={page}
                      hasNext={hasNext}
                      basePath="/manga/genres"
                      searchParams={{ genre }}
                    />
                  </>
                )}
              </>
            ) : (
              <div className="grid grid-cols-4" style={{ gap: 16 }}>
{genres.map((g: { slug: string; name: string; count: number }) => (
                  <a
                    key={g.slug}
                    href={`/manga/genres?genre=${g.slug}`}
                    className="card"
                    style={{ display: 'block', textAlign: 'center', padding: 24 }}
                  >
                    <h3 style={{ fontSize: 16, marginBottom: 8 }}>{g.name}</h3>
                    <p style={{ color: '#999' }}>{g.count} manga</p>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}