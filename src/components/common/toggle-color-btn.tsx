'use client';

import { Idea01Icon } from 'hugeicons-react';
import { Button } from '../ui/button';
import { useThemeStore } from '@/zustand/theme-store';
import { useEffect } from 'react';

/**
 * This component rendering a button for the toggle light and dark mode.
 *
 * @returns {React.ReactNode} The button component.
 */
export default function ToggleColorButton() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html')?.classList.add('dark');
    } else {
      document.querySelector('html')?.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Button
      type="button"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      size={'icon'}
      variant={theme === 'light' ? 'default' : 'ghost'}
      className="border border-purple-500/10 shadow-sm shadow-purple-600/30 transition-all duration-200 ease-in-out hover:shadow-xl hover:shadow-purple-600/40 dark:bg-gray-900"
    >
      <Idea01Icon />
    </Button>
  );
}
