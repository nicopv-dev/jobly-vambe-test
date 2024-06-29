'use client';

import { cn } from '@/lib/utils';

interface WrapperProps {
  /**
   * The children to be wrapped.
   */
  children: React.ReactNode;

  /**
   * The custom className styles for the wrapper
   */
  className?: string;
}

/**
 * This component is a style wrapper for all children components.
 *
 * @param {WrapperProps} props - The props for the component.
 * @returns {React.ReactNode} The card component.
 */
export default function Wrapper({ children, className }: WrapperProps) {
  return (
    <div className={cn('w-full max-w-screen-xl px-4', className)}>
      {children}
    </div>
  );
}
