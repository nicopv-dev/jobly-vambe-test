'use client';

import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import Column from './column';
import { SortableContext } from '@dnd-kit/sortable';
import { useEffect, useMemo, useState } from 'react';
import { useBoardStore } from '@/zustand/board-store';
import Task from '@/types/task';
import { createPortal } from 'react-dom';
import Card from './card';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/zustand/theme-store';

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
    })
    // useSensor(KeyboardSensor, {
    //   coordinateGetter: sortableKeyboardCoordinates,
    // })
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

    console.log(event);

    const sourceData = active.data.current?.task as Task;
    const targetData = over.data.current?.task as Task;

    if (!sourceData || !targetData) return;

    const sourceColumn = board.columns.get(sourceData.status);
    const targetColumn = board.columns.get(targetData.status);

    if (!sourceColumn || !targetColumn) return;

    console.log(`Move from ${sourceData.status} -> ${targetData.status}`);

    // // move task in the same column
    if (sourceData.status === targetData.status) {
      console.log('move same column');

      const taskIndex = sourceColumn.tasks.findIndex(
        (task) => task.id === activeId
      );
      const toIndex = targetColumn.tasks.findIndex(
        (task) => task.id === targetData.id
      );

      const tasks = Array.from(targetColumn.tasks);
      const [movedTask] = tasks.splice(taskIndex, 1);
      tasks.splice(toIndex, 0, movedTask);

      const updatedColumns = new Map(board.columns);
      updatedColumns.set(sourceData.status, { ...sourceColumn, tasks });

      useBoardStore.setState({ board: { columns: updatedColumns } });
    } else {
      console.log('move different column');

      const sourceTaskIndex = sourceColumn.tasks.findIndex(
        (task) => task.id === activeId
      );

      const targetTaskIndex = targetColumn.tasks.findIndex(
        (task) => task.id === targetData.id
      );
      const sourceTasks = Array.from(sourceColumn.tasks);
      console.log(sourceTasks);
      const [movedTask] = sourceTasks.splice(sourceTaskIndex, 1);

      console.log(movedTask);

      const targetTasks = Array.from(targetColumn.tasks);
      targetTasks.splice(targetTaskIndex, 0, movedTask);

      let updatedColumns = new Map(board.columns);

      updatedColumns.set(sourceData.status, {
        ...sourceColumn,
        tasks: sourceTasks,
      });
      updatedColumns.set(targetData.status, {
        ...targetColumn,
        tasks: targetTasks,
      });

      useBoardStore.setState({ board: { columns: updatedColumns } });
    }
  };

  return (
    <div className="w-full space-y-4 py-4">
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

          <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
