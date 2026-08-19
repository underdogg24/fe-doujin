import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { mangaApi } from '@/lib/api';
import { ChapterImages } from '@/types';
import Header from '@/components/Header';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const chapter = await mangaApi.chapterImages(id);
    return { title: `${chapter?.mangaTitle || 'Chapter'} - ${chapter?.title || ''} | Doujin Frontend` };
  } catch {
    return { title: 'Chapter tidak ditemukan | Doujin Frontend' };
  }
}

interface ReaderPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReaderPage({ params }: ReaderPageProps) {
  const { id } = await params;
  
  try {
    const chapter = await mangaApi.chapterImages(id);
    
    if (!chapter) notFound();
    
    return (
      <>
        <Header />
        <div className="reader-container">
          <nav style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 24,
            padding: '12px 16px',
            background: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: 8,
          }}>
            <Link 
              href={`/manga/${chapter.mangaSlug}`}
              className="btn btn-secondary"
            >
              ← Kembali ke {chapter.mangaTitle}
            </Link>
            <h2 style={{ fontSize: 18 }}>{chapter.title}</h2>
          </nav>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {chapter.images.map((imgUrl: string, index: number) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <Image
                  src={`/api/proxy-image?url=${encodeURIComponent(imgUrl)}`}
                  alt={`${chapter.title} - Halaman ${index + 1}`}
                  width={800}
                  height={1200}
                  className="reader-image"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAGggJ/PchI7wAAAABJRU5ErkJggg=="
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <nav style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginTop: 24,
            padding: '12px 16px',
            background: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: 8,
          }}>
            <Link 
              href={`/manga/${chapter.mangaSlug}`}
              className="btn btn-secondary"
            >
              ← Kembali ke Daftar Chapter
            </Link>
          </nav>
        </div>
      </>
    );
  } catch {
    notFound();
  }
}