import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Doujin Frontend',
  description: 'Manga & Video viewer untuk doujin.desu.xxx & nekopoi.care',
};

export const viewport: Viewport = {
  themeColor: '#0d0d0d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://doujin.desu.xxx" />
        <link rel="preconnect" href="https://amz-ch.desu.pics" />
        <link rel="preconnect" href="https://nekopoi.care" />
      </head>
      <body>{children}</body>
    </html>
  );
}