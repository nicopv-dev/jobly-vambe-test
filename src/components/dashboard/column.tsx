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
  column: ColumnType;
  tasks: Task[];
}

export default function Column({ column, tasks }: ColumnProps) {
  const { status } = column;

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: status,
      data: {
        type: 'column',
        column,
      },
      disabled: false,
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
        // {...attributes}
        className={cn(
          'flex h-[80vh] flex-col gap-4 rounded-md border-t-2 bg-white px-4 py-6 shadow-md backdrop-blur-md dark:bg-gray-900',
          className
        )}
      >
        <div className="flex items-center justify-between">
          <h5 className={cn('font-bold')}>
            {status}{' '}
            <span className="text-sm font-medium">({tasks.length})</span>
          </h5>

          <Button type="button" size="icon" variant="outline">
            <Add01Icon size={16} className="text-black" />
          </Button>
        </div>

        <div className="flex h-[80vh] flex-col gap-3 overflow-y-auto">
          <SortableContext items={tasksIds}>
            {tasks.map((task, index) => (
              <Card key={index} task={task} />
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
  );
}
