'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ 
  currentPage, 
  hasNext, 
  basePath,
  searchParams: initialSearchParams = {}
}: { 
  currentPage: number;
  hasNext: boolean;
  basePath: string;
  searchParams?: Record<string, string>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    Object.entries(initialSearchParams).forEach(([key, value]) => {
      params.set(key, value);
    });
    router.push(`${basePath}?${params.toString()}`);
  };

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Halaman sebelumnya"
      >
        « Sebelumnya
      </button>
      
      <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#999' }}>
        Halaman {currentPage}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNext}
        aria-label="Halaman selanjutnya"
      >
        Selanjutnya »
      </button>
    </nav>
  );
}