'use client';

import { Menu01Icon } from 'hugeicons-react';
import { Button } from '../ui/button';
import ToggleColorButton from '../common/toggle-color-btn';

export default function NavigationMenu() {
  return (
    <div className="flex h-16 items-center justify-between px-4 dark:bg-gray-900 md:hidden">
      <Button type="button" size="icon">
        <Menu01Icon />
      </Button>

      <ToggleColorButton />
    </div>
  );
}
