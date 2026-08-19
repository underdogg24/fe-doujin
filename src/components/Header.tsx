'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/manga', label: 'Manga' },
    { href: '/video', label: 'Video' },
    { href: '/manga/genres', label: 'Genre' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(13, 13, 13, 0.95)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid #333',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        <Link href="/" style={{ fontSize: 20, fontWeight: 700, color: '#e53935' }}>
          Doujin<span style={{ color: '#fff' }}>Frontend</span>
        </Link>
        
        <nav style={{ display: 'flex', gap: 8 }}>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                fontWeight: 500,
                fontSize: 14,
                color: pathname === item.href ? '#e53935' : '#e0e0e0',
                background: pathname === item.href ? 'rgba(229, 57, 53, 0.15)' : 'transparent',
                transition: 'all 0.2s',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}