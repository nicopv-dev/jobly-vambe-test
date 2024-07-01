'use client';

import { useMemo, useState } from 'react';
import { cn, generateRandomId, getColorByStatus } from '@/lib/utils';
import ColumnType from '@/types/column';
import { Button } from '../ui/button';
import { Add01Icon } from 'hugeicons-react';
import Card from './card';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Task from '@/types/task';
import { useBoardStore } from '@/zustand/board-store';
import { AnimatePresence } from 'framer-motion';
import CreateTaskForm from '../form/create-task-form';

interface ColumnProps {
  /**
   * Column type to render into component.
   */
  column: ColumnType;
  /**
   * The status column tasks
   */
  tasks: Task[];
}

/**
 * This component rendering a status (To do, In Progress and Done) column with all tasks.
 *
 * @param {ColumnProps} props - The props for the component.
 * @returns {React.ReactNode} The column component.
 */
export default function Column({ column, tasks }: ColumnProps) {
  const { status } = column;
  const [presentNewTask, setPresentNewTask] = useState<boolean>(false);
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: status,
      data: {
        type: 'column',
        column,
      },
      disabled: true,
    });
  const { addTask } = useBoardStore();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);
  const className = useMemo(() => getColorByStatus(column.status), [column]);

  const closePresentNewTask = () => {
    setPresentNewTask(false);
  };

  return (
    <div ref={setNodeRef} style={style} className="pb-4">
      <div
        {...attributes}
        {...listeners}
        className={cn(
          'flex h-[80vh] w-full flex-col gap-4 overflow-y-auto overflow-x-hidden rounded-md border-t-2 bg-white px-4 py-6 shadow-md backdrop-blur-md dark:bg-gray-900 sm:w-96 lg:w-[420px]',
          className
        )}
      >
        <div className="flex items-center justify-between">
          <h5 className={cn('font-bold')}>
            {status}{' '}
            <span className="text-sm font-medium">({tasks.length})</span>
          </h5>

          <Button
            type="button"
            size="icon"
            variant="outline"
            className="dark:bg-gray-900"
            onClick={() => setPresentNewTask(true)}
          >
            <Add01Icon size={16} className="text-black dark:text-white" />
          </Button>
        </div>

        <ul className="flex flex-col gap-3">
          <SortableContext items={tasksIds}>
            <AnimatePresence>
              {presentNewTask && (
                <CreateTaskForm
                  closeNewTaskForm={closePresentNewTask}
                  status={status}
                />
              )}
              {tasks.map((task) => (
                <Card key={task.id} task={task} />
              ))}
            </AnimatePresence>
          </SortableContext>
        </ul>
      </div>
    </div>
  );
}
