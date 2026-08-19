import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { videoApi } from '@/lib/api';
import { VideoDetail } from '@/types';
import Header from '@/components/Header';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const video = await videoApi.detail(slug);
    return { title: `${video?.title || 'Video'} | Doujin Frontend` };
  } catch {
    return { title: 'Video tidak ditemukan | Doujin Frontend' };
  }
}

interface VideoDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function VideoDetailPage({ params }: VideoDetailPageProps) {
  const { slug } = await params;
  
  try {
    const video = await videoApi.detail(slug);
    
    if (!video) notFound();
    
    return (
      <>
        <Header />
        <main className="container" style={{ paddingTop: 24, paddingBottom: 48, maxWidth: 900 }}>
          <article>
            <header style={{ marginBottom: 24 }}>
              <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>{video.title}</h1>
              {video.synopsis && (
                <p style={{ lineHeight: 1.7, color: '#ccc' }}>{video.synopsis}</p>
              )}
            </header>

            {video.thumb && (
              <div style={{ marginBottom: 24, borderRadius: 8, overflow: 'hidden' }}>
                <Image
                  src={video.thumb}
                  alt={video.title}
                  width={800}
                  height={450}
                  priority
                />
              </div>
            )}

            {video.players.length > 0 && (
              <section>
                <h2 style={{ fontSize: 20, marginBottom: 16 }}>Player Video</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {video.players.map((playerUrl: string, index: number) => (
                    <div key={index} style={{ position: 'relative' }}>
                      <iframe
                        src={playerUrl}
                        className="video-player"
                        allowFullScreen
                        title={`${video.title} - Server ${index + 1}`}
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                      />
                      <p style={{ marginTop: 8, fontSize: 14, color: '#999' }}>
                        Server {index + 1}: {new URL(playerUrl).hostname}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {video.players.length === 0 && (
              <div className="error">
                <p>Tidak ada player video tersedia untuk konten ini.</p>
              </div>
            )}
          </article>
        </main>
      </>
    );
  } catch {
    notFound();
  }
}