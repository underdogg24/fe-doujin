// Server-side helper untuk memanggil scraper library
import { 
  scrapeMangaList, 
  scrapeMangaDetail, 
  scrapeChapterImages, 
  scrapeGenres, 
  searchManga 
} from 'doujin-scraper/lib/scraper.js';
import { 
  scrapeNekoList, 
  scrapeNekoCategory, 
  scrapeNekoSearch, 
  scrapeNekoDetail, 
  scrapeNekoCategories 
} from 'doujin-scraper/lib/nekoScraper.js';

export const mangaApi = {
  list: (params: Parameters<typeof scrapeMangaList>[0]) => scrapeMangaList(params),
  detail: (slug: string) => scrapeMangaDetail(slug),
  chapterImages: (id: string) => scrapeChapterImages(id),
  genres: () => scrapeGenres(),
  search: (query: string) => searchManga(query),
};

export const videoApi = {
  list: (page?: number) => scrapeNekoList(page),
  category: (category: string, page?: number) => scrapeNekoCategory(category, page),
  search: (query: string, page?: number) => scrapeNekoSearch(query, page),
  detail: (slug: string) => scrapeNekoDetail(slug),
  categories: () => scrapeNekoCategories(),
};