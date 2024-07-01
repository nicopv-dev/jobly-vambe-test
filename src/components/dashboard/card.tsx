'use client';

import React, { useState } from 'react';
import Task from '@/types/task';
import { motion } from 'framer-motion';
import {
  Calendar01Icon,
  Edit02Icon,
  MultiplicationSignIcon,
  TickDouble02Icon,
} from 'hugeicons-react';
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
  const { id, description, title, status } = task;
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
  const { removeTask, editTask } = useBoardStore();
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newDescription, setNewDescription] = useState<string>(description);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <motion.li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }}
      style={style}
      className={cn(
        'relative space-y-4 rounded-md border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 ease-in-out hover:border-purple-400 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900',
        {
          'z-20 border-purple-400 bg-purple-50 backdrop-blur-md dark:bg-gray-800':
            isDragging,
        }
      )}
    >
      <div className="space-y-1">
        {isEditable ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
            className="w-full rounded-md bg-zinc-50 p-2 text-sm focus:outline-none dark:bg-gray-800 dark:text-gray-200"
          />
        ) : (
          <div className="flex items-center gap-0.5">
            <h3 className="font-semibold text-zinc-800 dark:text-gray-200">
              {title}
            </h3>
            <button
              type="button"
              onClick={() => setIsEditable(true)}
              className="rounded-full p-2"
            >
              <Edit02Icon size={12} />
            </button>
          </div>
        )}
        <p className="flex items-center gap-1 text-[10px] text-gray-700 dark:text-gray-400">
          <Calendar01Icon size={12} />
          <span>March, 3 2024</span>
        </p>
      </div>

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
            variant={'outline'}
            className="w-max text-red-500 hover:bg-red-400 hover:text-white dark:bg-gray-800 dark:hover:bg-red-500/80"
          >
            <TrashIcon size={14} />
          </Button>
        </div>
      ) : (
        <form>
          <textarea
            value={newDescription}
            onChange={(e) => {
              setNewDescription(e.target.value);
            }}
            className="h-40 w-full resize-none rounded-md bg-zinc-50 p-2 text-sm focus:outline-none dark:bg-gray-800 dark:text-gray-200"
          />

          <div className="flex items-center justify-end">
            <Button
              type="button"
              size={'icon'}
              variant={'ghost'}
              title="Cancelar"
              onClick={() => setIsEditable(false)}
              className="text-red-500"
            >
              <MultiplicationSignIcon size={14} />
            </Button>
            <Button
              type="button"
              size={'icon'}
              variant={'ghost'}
              title="Confirmar"
              onClick={() => {
                editTask({
                  id,
                  title: newTitle,
                  description: newDescription,
                  status,
                });
                setIsEditable(false);
              }}
            >
              <TickDouble02Icon size={14} />
            </Button>
          </div>
        </form>
      )}
    </motion.li>
  );
}
