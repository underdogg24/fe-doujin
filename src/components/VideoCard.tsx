import Image from 'next/image';
import Link from 'next/link';
import { VideoListItem } from '@/types';

interface VideoCardProps {
  video: VideoListItem;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <Link href={`/video/${video.slug}`} className="card" style={{ display: 'block' }}>
      <div style={{ position: 'relative', aspectRatio: '16/9' }}>
        {video.thumb ? (
          <Image
            src={video.thumb}
            alt={video.title}
            fill
            className="card-thumb"
            sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw"
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
        <h3 className="card-title">{video.title}</h3>
        {video.date && <div className="card-meta"><span>{video.date}</span></div>}
      </div>
    </Link>
  );
}