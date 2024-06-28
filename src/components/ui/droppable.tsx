'use client';

import { cn } from '@/lib/utils';
import { useDroppable } from '@dnd-kit/core';

interface DroppableProps {
  children: React.ReactNode;
  id: string;
}

export default function Droppable({ id, children }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn({
        'bg-purple-100': isOver,
      })}
    >
      {children}
    </div>
  );
}
