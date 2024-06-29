'use client';

import React, { useState } from 'react';
import Task from '@/types/task';
import { motion } from 'framer-motion';
import { MultiplicationSignIcon, TickDouble02Icon } from 'hugeicons-react';
import { Button } from '../ui/button';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { useBoardStore } from '@/zustand/board-store';
import { TrashIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CardProps {
  /**
   * The task to be displayed in the card.
   */
  task: Task;
}

/**
 * Tihs component rendering a card with the task information.
 *
 * @param {CardProps} props - The props for the component.
 * @returns {React.ReactNode} The card component.
 */
export default function Card({ task }: CardProps) {
  const { id, description, title } = task;
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: 'card',
      task,
    },
    disabled: isEditable,
  });
  const { removeTask } = useBoardStore();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={cn(
        'relative space-y-4 rounded-md border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 ease-in-out hover:border-purple-400 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900',
        {
          'z-20 border-purple-400 bg-purple-50 backdrop-blur-md dark:bg-gray-800':
            isDragging,
        }
      )}
    >
      <h6 className="font-semibold text-black dark:text-white">{title}</h6>

      {!isEditable ? (
        <div className="flex flex-col gap-3">
          <motion.div
            animate={isDragging ? false : 'visible'}
            initial={{ height: '2.5rem' }}
            whileHover={{ height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p
              className="overflow-x-hidden text-sm text-zinc-600 transition-all duration-300 ease-in-out hover:cursor-text dark:text-zinc-300"
              onClick={() => setIsEditable(true)}
            >
              {description}
            </p>
          </motion.div>
          <Button
            type="button"
            onClick={() => removeTask(id)}
            size="icon"
            variant={'destructive'}
            className="w-max"
          >
            <TrashIcon size={14} />
          </Button>
        </div>
      ) : (
        <form>
          <textarea
            value={description}
            onChange={(e) => {
              console.log(e.target.value);
            }}
            className="h-40 w-full resize-none rounded-md bg-zinc-50 p-2"
          />

          <div className="flex items-center justify-end">
            <Button
              type="button"
              size={'icon'}
              variant={'ghost'}
              title="Cancelar"
              onClick={() => setIsEditable(false)}
            >
              <MultiplicationSignIcon size={14} />
            </Button>
            <Button
              type="button"
              size={'icon'}
              variant={'ghost'}
              title="Confirmar"
            >
              <TickDouble02Icon size={14} />
            </Button>
          </div>
        </form>
      )}
    </li>
  );
}
