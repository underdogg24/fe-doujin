import Image from 'next/image';
import Link from 'next/link';
import { MangaListItem } from '@/types';

interface MangaCardProps {
  manga: MangaListItem;
}

export default function MangaCard({ manga }: MangaCardProps) {
  return (
    <Link href={`/manga/${manga.slug}`} className="card" style={{ display: 'block' }}>
      <div style={{ position: 'relative', aspectRatio: '2/3' }}>
        {manga.thumb ? (
          <Image
            src={manga.thumb}
            alt={manga.title}
            fill
            className="card-thumb"
            sizes="(max-width: 400px) 50vw, (max-width: 800px) 33vw, (max-width: 1200px) 25vw, 20vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAGggJ/PchI7wAAAABJRU5ErkJggg=="
          />
        ) : (
          <div className="skeleton" style={{ width: '100%', height: '100%' }} />
        )}
        {manga.rating && (
          <span className="badge" style={{ position: 'absolute', top: 8, right: 8 }}>
            ★ {manga.rating}
          </span>
        )}
      </div>
      <div className="card-body">
        <h3 className="card-title">{manga.title}</h3>
        <div className="card-meta">
          {manga.type && <span>{manga.type}</span>}
          {manga.status && <span>{manga.status}</span>}
          {manga.latestChapter && <span>Ch. {manga.latestChapter}</span>}
        </div>
      </div>
    </Link>
  );
}