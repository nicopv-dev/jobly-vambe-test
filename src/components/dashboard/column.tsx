'use client';

import { useMemo } from 'react';
import { cn, getColorByStatus } from '@/lib/utils';
import ColumnType from '@/types/column';
import { Button } from '../ui/button';
import { Add01Icon } from 'hugeicons-react';
import Card from './card';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Task from '@/types/task';

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

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: status,
      data: {
        type: 'column',
        column,
      },
      disabled: true,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);
  const className = useMemo(() => getColorByStatus(column.status), [column]);

  return (
    <div ref={setNodeRef} style={style}>
      <div
        {...attributes}
        {...listeners}
        className={cn(
          'flex max-h-[80vh] flex-col gap-4 rounded-md border-t-2 bg-white px-4 py-6 shadow-md backdrop-blur-md dark:bg-gray-900',
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
          >
            <Add01Icon size={16} className="text-black dark:text-white" />
          </Button>
        </div>

        <div className="flex h-[80vh] flex-col gap-3 overflow-y-auto">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <Card key={task.id} task={task} />
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
  );
}
