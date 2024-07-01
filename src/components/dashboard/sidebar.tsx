'use client';

import {
  DocumentCodeIcon,
  Home02Icon,
  Mail01Icon,
  UserSearch01Icon,
} from 'hugeicons-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import ToggleColorButton from '../common/toggle-color-btn';

/**
 * This component rendering a sibar with the navegation (only design).
 *
 * @returns {React.ReactNode} The sidebar component.
 */
export default function Sidebar() {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 hidden h-screen w-20 flex-col justify-between overflow-y-hidden border-r border-r-gray-200 bg-white p-4 dark:border-r-gray-900 dark:bg-gray-900 md:flex'
      )}
    >
      <div className="flex w-full flex-col gap-6 py-20">
        <Button
          type="button"
          size="icon"
          variant={'ghost'}
          className="text-primary dark:text-purple-400"
        >
          <Home02Icon size={20} />
        </Button>
        <Button
          type="button"
          size="icon"
          variant={'ghost'}
          className="text-black dark:text-white"
        >
          <DocumentCodeIcon size={20} />
        </Button>
        <Button
          type="button"
          size="icon"
          variant={'ghost'}
          className="text-black dark:text-white"
        >
          <Mail01Icon size={20} />
        </Button>
        <Button
          type="button"
          size="icon"
          variant={'ghost'}
          className="text-black dark:text-white"
        >
          <UserSearch01Icon size={20} />
        </Button>
      </div>

      <ToggleColorButton />
    </aside>
  );
}
