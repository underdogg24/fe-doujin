# Doujin Frontend (Next.js 14)

Frontend untuk library **doujin-scraper** — menampilkan manga dari `doujin.desu.xxx` dan video dari `nekopoi.care`.

## Persiapan

1. **Install dependency library lokal:**
   ```bash
   cd C:\project\doujin\nextjs-frontend
   npm install
   ```

2. **Setup environment:**
   ```bash
   cp .env.example .env
   ```
   Isi `DOUJIN_APP_SECRET` dan `DOUJIN_SALT` dari hasil `npm run get-secret` di folder `../doujin-scraper-24`.

   > Atau copy file `.env` yang sudah terisi dari `../doujin-scraper-24/.env` ke sini.

## Menjalankan Development

```bash
npm run dev
```
Buka http://localhost:3000

## Build Production

```bash
npm run build
npm start
```

## Struktur Halaman

| Route | Deskripsi |
|-------|-----------|
| `/` | Home - manga & video terbaru |
| `/manga` | Daftar manga (filter: query, type, genre, sort) |
| `/manga/[slug]` | Detail manga + daftar chapter |
| `/read/[id]` | Baca chapter (proxy gambar dengan Referer) |
| `/manga/genres` | Daftar genre + filter manga per genre |
| `/video` | Daftar video terbaru |
| `/video/[slug]` | Detail video + iframe player |
| `/video/category/[category]` | Video per kategori (hentai, jav, 2d-animation, 3d-hentai, jav-cosplay) |
| `/video/search` | Pencarian video |

## API Routes (Server-side)

| Route | Fungsi |
|-------|--------|
| `/api/manga/list` | Wrapper `scrapeMangaList` |
| `/api/manga/detail/[slug]` | Wrapper `scrapeMangaDetail` |
| `/api/manga/chapter/[id]` | Wrapper `scrapeChapterImages` |
| `/api/manga/genres` | Wrapper `scrapeGenres` |
| `/api/video/list` | Wrapper `scrapeNekoList` |
| `/api/video/category/[category]` | Wrapper `scrapeNekoCategory` |
| `/api/video/search` | Wrapper `scrapeNekoSearch` |
| `/api/video/detail/[slug]` | Wrapper `scrapeNekoDetail` |
| `/api/video/categories` | Wrapper `scrapeNekoCategories` |
| `/api/proxy-image?url=` | Proxy gambar chapter dengan header `Referer` |

## Catatan Penting

- **Gambar chapter** dari `amz-ch.desu.pics` butuh header `Referer: https://doujin.desu.xxx/` → dihandle oleh `/api/proxy-image`.
- **Secret** (`DOUJIN_APP_SECRET`, `DOUJIN_SALT`) hanya dipakai di server-side (API routes), **tidak** expose ke client.
- **Player video** = iframe dari `playmogo.com` / `yandex.ru` → ditampilkan langsung.
- **Cache neko detail** 10 menit sudah di library (`lib/cache.js`).

## Deploy

Bisa deploy ke Vercel/Netlify (Next.js 14 App Router compatible). Set environment variables di dashboard deploy.