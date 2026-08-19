'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function MangaSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const params = new URLSearchParams();
      params.set('query', query.trim());
      router.push(`/manga?${params.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, maxWidth: 400 }}>
      <input
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Cari manga..."
        style={{
          flex: 1,
          padding: '10px 16px',
          borderRadius: 8,
          border: '1px solid #333',
          background: '#1a1a1a',
          color: '#fff',
          fontSize: 14,
        }}
      />
      <button type="submit" className="btn btn-primary">Cari</button>
    </form>
  );
}