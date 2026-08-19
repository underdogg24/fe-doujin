import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { mangaApi } from '@/lib/api';
import { ChapterImages } from '@/types';
import ReaderClient from '@/components/ReaderClient';

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
      <main className="min-h-screen bg-ink dark:bg-ink">
        <ReaderClient chapter={chapter} />
      </main>
    );
  } catch {
    notFound();
  }
}