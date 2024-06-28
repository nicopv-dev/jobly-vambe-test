'use client';

import {
  DocumentCodeIcon,
  Home02Icon,
  Mail01Icon,
  UserSearch01Icon,
} from 'hugeicons-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 hidden h-screen overflow-y-hidden border-r border-r-gray-200 bg-white p-4 dark:border-r-gray-900 dark:bg-gray-900 xl:block'
      )}
    >
      <div className="flex flex-col gap-6 py-20">
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
    </aside>
  );
}
