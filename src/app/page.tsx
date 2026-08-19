import { Metadata } from 'next';
import Link from 'next/link';
import { mangaApi, videoApi } from '@/lib/api';
import Header from '@/components/Header';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Doujin Frontend - Manga & Video Viewer',
  description: 'Manga dari doujin.desu.xxx & Video dari nekopoi.care',
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [manga, video] = await Promise.all([
    mangaApi.list({ page: 1, limit: 12 }),
    videoApi.list(1),
  ]);

  return (
    <>
      <Header />
      <main className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
        <section style={{ marginBottom: 48 }}>
          <div className="section-header">
            <h1 className="section-title">Manga Terbaru</h1>
            <Link href="/manga" className="btn btn-secondary">Lihat Semua</Link>
          </div>
          <div className="grid grid-cols-6" role="list">
            {manga.slice(0, 12).map((item: { title: string; slug: string; thumb: string; rating: number | null; type: string; latestChapter: number | null }) => (
              <Link key={item.slug} href={`/manga/${item.slug}`} className="card" style={{ display: 'block' }}>
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
                    {item.latestChapter && <span>Ch. {item.latestChapter}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="section-header">
            <h1 className="section-title">Video Terbaru</h1>
            <Link href="/video" className="btn btn-secondary">Lihat Semua</Link>
          </div>
          <div className="grid grid-cols-4" role="list">
            {video.videos.slice(0, 8).map((item: { title: string; slug: string; thumb: string; date: string }) => (
              <Link key={item.slug} href={`/video/${item.slug}`} className="card" style={{ display: 'block' }}>
                <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                  {item.thumb ? (
                    <Image
                      src={item.thumb}
                      alt={item.title}
                      fill
                      className="card-thumb"
                      sizes="(max-width: 600px) 50vw, 25vw"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAGggJ/PchI7wAAAABJRU5ErkJggg=="
                    />
                  ) : (
                    <div className="skeleton" style={{ width: '100%', height: '100%' }} />
                  )}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: 12,
                  }}>
                    <span style={{
                      background: '#e53935',
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: 4,
                      fontSize: 12,
                      fontWeight: 600,
                    }}>
                      ▶ Tonton
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <h3 className="card-title">{item.title}</h3>
                  {item.date && <div className="card-meta"><span>{item.date}</span></div>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}