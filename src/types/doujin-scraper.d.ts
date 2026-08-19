declare module 'doujin-scraper/lib/scraper.js' {
  export function scrapeMangaList(opts?: {
    page?: number;
    query?: string;
    type?: string;
    genre?: string;
    sort?: string;
    limit?: number;
  }): Promise<
    Array<{
      title: string;
      slug: string;
      thumb: string;
      rating: number | null;
      type: string;
      status: string | null;
      latestChapter: number | null;
    }>
  >;
  export function scrapeGenres(): Promise<Array<{ slug: string; name: string; count: number }>>;
  export function scrapeMangaDetail(
    slug: string
  ): Promise<{
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
    chapters: Array<{ id: string; number: number | null; title: string; date: string }>;
    views: number;
  } | null>;
  export function scrapeChapterImages(
    id: string
  ): Promise<{
    images: string[];
    mangaSlug: string;
    mangaTitle: string;
    title: string;
    number: number | null;
  } | null>;
  export function searchManga(
    query: string
  ): Promise<
    Array<{
      title: string;
      slug: string;
      thumb: string;
      rating: number | null;
      type: string;
      status: string | null;
      latestChapter: number | null;
    }>
  >;
}

declare module 'doujin-scraper/lib/nekoScraper.js' {
  export function scrapeNekoList(page?: number): Promise<{
    videos: Array<{ title: string; slug: string; url: string; thumb: string; date: string; synopsis: string }>;
    hasNext: boolean;
  }>;
  export function scrapeNekoCategory(
    category: string,
    page?: number
  ): Promise<{
    videos: Array<{ title: string; slug: string; url: string; thumb: string; date: string; synopsis: string }>;
    hasNext: boolean;
  }>;
  export function scrapeNekoSearch(
    query: string,
    page?: number
  ): Promise<{
    videos: Array<{ title: string; slug: string; url: string; thumb: string; date: string; synopsis: string }>;
    hasNext: boolean;
  }>;
  export function scrapeNekoCategories(): Promise<Array<{ slug: string; name: string }>>;
  export function scrapeNekoDetail(
    slug: string
  ): Promise<{
    title: string;
    slug: string;
    thumb: string;
    players: string[];
    synopsis: string;
  } | null>;
}