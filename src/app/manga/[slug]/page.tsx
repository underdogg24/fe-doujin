import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { mangaApi } from '@/lib/api';
import { MangaDetail } from '@/types';
import Header from '@/components/Header';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const manga = await mangaApi.detail(slug);
    return { title: `${manga?.title || 'Manga'} | Doujin Frontend` };
  } catch {
    return { title: 'Manga tidak ditemukan | Doujin Frontend' };
  }
}

interface MangaDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function MangaDetailPage({ params }: MangaDetailPageProps) {
  const { slug } = await params;
  
  try {
    const manga = await mangaApi.detail(slug);
    
    if (!manga) notFound();
    
    return (
      <>
        <Header />
        <main className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 32, maxWidth: '1000px' }}>
            <div>
              {manga.thumb ? (
                <Image
                  src={manga.thumb}
                  alt={manga.title}
                  width={300}
                  height={450}
                  style={{ borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}
                  priority
                />
              ) : (
                <div className="skeleton" style={{ width: 300, height: 450, borderRadius: 8 }} />
              )}
            </div>

            <div>
              <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{manga.title}</h1>
              {manga.altTitle && (
                <p style={{ color: '#999', marginBottom: 16 }}>{manga.altTitle}</p>
              )}

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                {manga.rating && (
                  <span style={{ background: '#e53935', color: 'white', padding: '4px 12px', borderRadius: 4, fontWeight: 600 }}>
                    ★ {manga.rating}
                  </span>
                )}
                {manga.type && (
                  <span className="badge">{manga.type}</span>
                )}
                {manga.status && (
                  <span className="badge" style={{ background: '#333' }}>{manga.status}</span>
                )}
                <span className="badge" style={{ background: '#333' }}>{manga.views.toLocaleString()} views</span>
              </div>

              {manga.author && (
                <p style={{ marginBottom: 4 }}><strong>Penulis:</strong> {manga.author}</p>
              )}
              {manga.artist && (
                <p style={{ marginBottom: 4 }}><strong>Illustrator:</strong> {manga.artist}</p>
              )}

              {manga.genres.length > 0 && (
                <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {manga.genres.map((g: { name: string; slug: string }) => (
                    <Link
                      key={g.slug}
                      href={`/manga?genre=${g.slug}`}
                      className="badge"
                      style={{ background: '#333', textDecoration: 'none' }}
                    >
                      {g.name}
                    </Link>
                  ))}
                </div>
              )}

              {manga.synopsis && (
                <div style={{ marginTop: 24 }}>
                  <h3 style={{ fontSize: 18, marginBottom: 12 }}>Sinopsis</h3>
                  <p style={{ lineHeight: 1.7, color: '#ccc', whiteSpace: 'pre-line' }}>
                    {manga.synopsis}
                  </p>
                </div>
              )}

              {manga.chapters.length > 0 && (
                <div style={{ marginTop: 32 }}>
                  <h3 style={{ fontSize: 18, marginBottom: 16 }}>Daftar Chapter</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 400, overflow: 'auto' }}>
                    {manga.chapters.slice().reverse().map((ch: { id: string; number: number | null; title: string; date: string }) => (
                      <Link
                        key={ch.id}
                        href={`/read/${ch.id}`}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px 16px',
                          background: '#1a1a1a',
                          border: '1px solid #333',
                          borderRadius: 8,
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = '#e53935'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = '#333'}
                      >
                        <span style={{ fontWeight: 500 }}>
                          {ch.title ? `Chapter ${ch.number}: ${ch.title}` : `Chapter ${ch.number}`}
                        </span>
                        <span style={{ color: '#999', fontSize: 14 }}>{ch.date}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </>
    );
  } catch {
    notFound();
  }
}