'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="btn-press grid h-10 w-10 place-items-center border-2 border-ink bg-neon text-ink shadow-brutal-sm transition-colors dark:border-bone dark:text-bone"
    >
      {mounted ? (isDark ? <Sun size={20} /> : <Moon size={20} />) : <Sun size={20} />}
    </button>
  );
}