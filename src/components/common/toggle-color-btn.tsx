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
    <div className="fixed right-2 top-2">
      <Button
        type="button"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        size={'icon'}
        variant={theme === 'light' ? 'default' : 'ghost'}
        className="shadow-lg dark:bg-gray-900"
      >
        <Idea01Icon />
      </Button>
    </div>
  );
}
