// Types untuk data dari doujin-scraper

export interface MangaListItem {
  title: string;
  slug: string;
  thumb: string;
  rating: number | null;
  type: string;
  status: string | null;
  latestChapter: number | null;
}

export interface MangaDetail {
  title: string;
  altTitle: string | null;
  thumb: string;
  rating: number | null;
  status: string | null;
  type: string;
  synopsis: string;
  author: string | null;
  artist: string | null;
  genres: Array<{ name: string; slug: string }>;
  chapters: Array<{
    id: string;
    number: number | null;
    title: string;
    date: string;
  }>;
  views: number;
}

export interface ChapterImages {
  images: string[];
  mangaSlug: string;
  mangaTitle: string;
  title: string;
  number: number | null;
}

export interface Genre {
  slug: string;
  name: string;
  count: number;
}

export interface VideoListItem {
  title: string;
  slug: string;
  url: string;
  thumb: string;
  date: string;
  synopsis: string;
}

export interface VideoListResponse {
  videos: VideoListItem[];
  hasNext: boolean;
}

export interface VideoDetail {
  title: string;
  slug: string;
  thumb: string;
  players: string[];
  synopsis: string;
}

export interface VideoCategory {
  slug: string;
  name: string;
}

export interface ScrapeMangaListParams {
  page?: number;
  query?: string;
  type?: string;
  genre?: string;
  sort?: string;
  limit?: number;
}