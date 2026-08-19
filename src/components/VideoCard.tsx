import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { VideoListItem } from '@/types';

interface VideoCardProps {
  video: VideoListItem;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <Link
      href={`/video/${video.slug}`}
      className="card-brutal group flex flex-col border-2 border-ink bg-bone shadow-brutal dark:border-bone dark:bg-ink dark:shadow-brutal-white"
    >
      <div className="relative aspect-video overflow-hidden border-b-2 border-ink dark:border-bone">
        {video.thumb ? (
          <Image
            src={video.thumb}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAGggJ/PchI7wAAAABJRU5ErkJggg=="
          />
        ) : (
          <div className="skeleton h-full w-full" />
        )}
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 border-2 border-ink bg-neon px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-ink shadow-brutal-sm dark:border-bone">
          <Play size={11} className="fill-ink" /> Watch
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="font-display text-lg leading-tight tracking-wide text-ink dark:text-bone">
          {video.title}
        </h3>
        {video.date && (
          <p className="mt-auto font-sans text-[11px] font-bold uppercase tracking-wider text-ink/60 dark:text-bone/60">
            {video.date}
          </p>
        )}
      </div>
    </Link>
  );
}