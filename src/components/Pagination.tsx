'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage,
  hasNext,
  basePath,
  searchParams: initialSearchParams = {},
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
    <nav className="mt-8 flex items-center justify-center gap-3" aria-label="Pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Halaman sebelumnya"
        className="btn-press inline-flex items-center gap-2 border-2 border-ink bg-bone px-5 py-2.5 font-sans text-sm font-bold uppercase tracking-wider text-ink shadow-brutal-sm transition-colors hover:bg-neon disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-bone dark:border-bone dark:bg-ink dark:text-bone dark:shadow-brutal-white"
      >
        <ChevronLeft size={16} /> Prev
      </button>

      <span className="border-2 border-ink bg-bone px-4 py-2.5 font-sans text-sm font-bold uppercase tracking-wider text-ink shadow-brutal-sm dark:border-bone dark:bg-ink dark:text-bone">
        Page {currentPage}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNext}
        aria-label="Halaman selanjutnya"
        className="btn-press inline-flex items-center gap-2 border-2 border-ink bg-bone px-5 py-2.5 font-sans text-sm font-bold uppercase tracking-wider text-ink shadow-brutal-sm transition-colors hover:bg-neon disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-bone dark:border-bone dark:bg-ink dark:text-bone dark:shadow-brutal-white"
      >
        Next <ChevronRight size={16} />
      </button>
    </nav>
  );
}