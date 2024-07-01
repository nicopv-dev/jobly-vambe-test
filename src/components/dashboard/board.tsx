'use client';

import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import Column from './column';
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { useEffect, useMemo, useState } from 'react';
import { useBoardStore } from '@/zustand/board-store';
import Task from '@/types/task';
import { createPortal } from 'react-dom';
import Card from './card';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/zustand/theme-store';
import ColumnType from '@/types/column';

/**
 * This component rendering a board kanban.
 *
 * @returns {React.ReactNode} The card component.
 */
export default function Board() {
  const { loadBoard, board, moveTask } = useBoardStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);
  const { theme } = useThemeStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const columnsIds = useMemo(
    () => Array.from(board.columns).map(([_, col]) => col.status),
    [board]
  );

  useEffect(() => {
    loadBoard();
    setIsClient(true);
  }, []);

  const onDragStart = (event: DragStartEvent) => {
    const data = event.active.data;

    if (data.current?.type == 'card') {
      setActiveTask(data.current?.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as number;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'card';
    const isOverATask = over.data.current?.type === 'card';

    if (!isActiveATask) return;

    if (isActiveATask === isOverATask) {
      const sourceData = active.data.current?.task as Task;
      const targetData = over.data.current?.task as Task;

      moveTask(
        sourceData.id,
        targetData.id,
        sourceData.status,
        targetData.status
      );
    }

    const isOverAColumn = over.data.current?.type === 'column';

    if (isActiveATask && isOverAColumn) {
      const column = over.data.current?.column as ColumnType;

      const sourceData = active.data.current?.task as Task;

      const updatedColumn = new Map(board.columns);
      const newTasks = updatedColumn.get(sourceData.status)?.tasks;

      updatedColumn.set(sourceData.status, {
        status: sourceData.status,
        tasks: newTasks!.filter((item) => item.id !== sourceData.id),
      });
      sourceData.status = column.status;
      updatedColumn.set(column.status, {
        ...column,
        tasks: [...column.tasks, sourceData],
      });

      useBoardStore.setState({ board: { columns: updatedColumn } });
    }
  };

  return (
    <div className="w-full space-y-4 py-4 sm:py-10">
      <h2
        className={cn('text-2xl font-semibold', {
          'text-white': theme === 'dark',
        })}
      >
        Welcome, to my dashboard
      </h2>
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sensors={sensors}
        collisionDetection={closestCorners}
      >
        <div className="space-y-4">
          {/* <h3>Board</h3> */}

          <div className="grid grow auto-cols-max grid-flow-col gap-4 overflow-x-auto overflow-y-auto py-4">
            <SortableContext items={columnsIds}>
              {Array.from(board.columns.entries()).map(([_, col], index) => (
                <Column key={index} column={col} tasks={col.tasks} />
              ))}
            </SortableContext>
          </div>
        </div>

        {isClient &&
          createPortal(
            <DragOverlay>
              {activeTask ? <Card task={activeTask} /> : null}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </div>
  );
}
