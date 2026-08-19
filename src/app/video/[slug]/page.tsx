import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { videoApi } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { MonitorPlay, Play } from 'lucide-react';

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

    const sortedPlayers = [...video.players].sort((a, b) => {
      const score = (u: string) => (/streampoi\.com/.test(u) ? 0 : /yandex\.ru/.test(u) ? 1 : 2);
      return score(a) - score(b);
    });

    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <Link
            href="/video"
            className="mb-6 inline-block border-2 border-ink bg-bone px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-wider text-ink shadow-brutal-sm transition-all hover:translate-x-0.5 hover:translate-y-0.5 dark:border-bone dark:bg-ink dark:text-bone"
          >
            ← Back to Video
          </Link>

          <article>
            <header className="mb-8">
              <h1 className="font-display text-4xl uppercase leading-none tracking-wide text-ink dark:text-bone sm:text-5xl">
                {video.title}
              </h1>
              {video.synopsis && (
                <div className="mt-4 border-2 border-ink bg-bone p-5 shadow-brutal dark:border-bone dark:bg-ink dark:shadow-brutal-neon">
                  <p className="whitespace-pre-line font-sans text-base leading-relaxed text-ink/85 dark:text-bone/85">
                    {video.synopsis}
                  </p>
                </div>
              )}
            </header>

            {video.thumb && (
              <div className="mb-8 border-2 border-ink bg-bone p-2 shadow-brutal dark:border-bone dark:bg-ink dark:shadow-brutal-neon">
                <Image
                  src={video.thumb}
                  alt={video.title}
                  width={800}
                  height={450}
                  className="w-full border-2 border-ink object-cover dark:border-bone"
                  priority
                />
              </div>
            )}

            {sortedPlayers.length > 0 && (
              <section>
                <h2 className="mb-4 inline-flex items-center gap-2 font-display text-3xl uppercase tracking-wide text-ink dark:text-bone">
                  <MonitorPlay size={26} className="text-neon" /> PLAYERS
                </h2>
                <div className="flex flex-col gap-8">
                  {sortedPlayers.map((playerUrl: string, index: number) => {
                    let host = playerUrl;
                    try {
                      host = new URL(playerUrl).hostname;
                    } catch {}
                    return (
                      <div key={index} className="border-2 border-ink bg-bone p-3 shadow-brutal dark:border-bone dark:bg-ink dark:shadow-brutal-neon">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-ink dark:text-bone">
                            <Play size={14} className="fill-neon text-neon" /> Server {index + 1}
                          </span>
                          <span className="font-sans text-xs font-bold uppercase tracking-wider text-ink/60 dark:text-bone/60">
                            {host}
                          </span>
                        </div>
                        <iframe
                          src={playerUrl}
                          className="aspect-video w-full border-2 border-ink bg-black dark:border-bone"
                          scrolling="no"
                          frameBorder="0"
                          allowFullScreen
                          title={`${video.title} - Server ${index + 1}`}
                          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                        />
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {sortedPlayers.length === 0 && (
              <div className="border-2 border-ink bg-bone p-10 text-center shadow-brutal dark:border-bone dark:bg-ink dark:shadow-brutal-white">
                <p className="font-display text-2xl uppercase tracking-wide text-ink dark:text-bone">
                  NO PLAYERS AVAILABLE
                </p>
                <p className="mt-2 font-sans text-sm text-ink/70 dark:text-bone/70">
                  Tidak ada player video tersedia untuk konten ini.
                </p>
              </div>
            )}
          </article>
        </main>
        <Footer />
      </>
    );
  } catch {
    notFound();
  }
}