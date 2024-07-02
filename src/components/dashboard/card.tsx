'use client';

import React, { useState } from 'react';
import Task, { TaskForm, TaskSchema } from '@/types/task';
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
import { cn, generateRandomId } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface CardProps {
  /**
   * The task to be displayed in the card.
   */
  task: Task;
}

/**
 * This component renders a card with the task information.
 *
 * @param {CardProps} props - The props for the component.
 * @returns {React.ReactNode} The card component.
 */
export default function Card({ task }: CardProps) {
  const { id, status } = task;
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  const editTaskSubmit: SubmitHandler<TaskForm> = ({ title, description }) => {
    editTask({
      id, // Usa el ID existente en lugar de generar uno nuevo
      title,
      description,
      status,
    });
    setIsEditable(false);
  };

  const onCancel = () => {
    reset();
    setIsEditable(false);
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
      <form onSubmit={handleSubmit(editTaskSubmit)} className="space-y-1">
        <div className="space-y-1">
          {isEditable ? (
            <>
              <input
                type="text"
                className="w-full rounded-md bg-zinc-50 p-2 text-sm text-gray-800 focus:outline-none dark:bg-gray-800 dark:text-gray-200"
                placeholder="Change the title"
                {...register('title')}
              />
              {errors.title && (
                <span className="text-xs text-red-500">
                  {errors.title.message}
                </span>
              )}
            </>
          ) : (
            <div className="flex items-center gap-0.5">
              <h3 className="font-semibold text-zinc-800 dark:text-gray-200">
                {task.title}
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
            <p
              className="overflow-x-hidden rounded-lg bg-gray-50 p-2 text-sm text-zinc-600 transition-all duration-300 ease-in-out hover:cursor-text dark:bg-gray-800/40 dark:text-zinc-300"
              onClick={() => setIsEditable(true)}
            >
              {task.description}
            </p>
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
          <div>
            <textarea
              placeholder="Change the description"
              className="h-40 w-full resize-none rounded-md bg-zinc-50 p-2 text-sm text-gray-800 focus:outline-none dark:bg-gray-800 dark:text-gray-200"
              {...register('description')}
            />
            {errors.description && (
              <span className="text-xs text-red-500">
                {errors.description.message}
              </span>
            )}

            <div className="flex items-center justify-end">
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    type="button"
                    size={'icon'}
                    variant={'ghost'}
                    onClick={onCancel}
                    className="text-red-500"
                  >
                    <MultiplicationSignIcon size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cancel</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button type="submit" size={'icon'} variant={'ghost'}>
                    <TickDouble02Icon size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create task</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        )}
      </form>
    </motion.li>
  );
}
