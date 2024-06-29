import { create } from 'zustand';
import ColumnType from '@/types/column';
import { TaskStatus } from '@/types/task_status';
import { TASKS } from '@/utils/constants';
import Board from '@/types/board';
import { arrayMove } from '@dnd-kit/sortable';
import Task from '@/types/task';

interface State {
  board: {
    columns: Map<TaskStatus, ColumnType>;
  };
}

interface Action {
  loadBoard: () => void;
  removeTask: (taskId: number) => void;
  moveTask: (
    taskId: number,
    targetTaskId: number,
    sourceStatus: TaskStatus,
    targetStatus: TaskStatus
  ) => void;
  addTask: (task: Task) => void;
}

const boardStore = create<State & Action>((set) => ({
  board: {
    columns: new Map<TaskStatus, ColumnType>(),
  },
  loadBoard: () => {
    // GROUP TASK BY STATUS
    const groupedTasks = TASKS.reduce((acc, task) => {
      if (task && !acc.get(task.status)) {
        acc.set(task.status, {
          status: task.status,
          tasks: [],
        });
      }

      if (task) {
        acc.get(task.status)!.tasks.push(task);
      }

      return acc;
    }, new Map<TaskStatus, ColumnType>());

    const board: Board = {
      columns: groupedTasks,
    };

    set({ board });
  },
  removeTask: (taskId: number) => {
    set((state) => {
      const updatedColumns = new Map(state.board.columns);

      for (const column of Array.from(updatedColumns.values())) {
        column.tasks = column.tasks.filter((task) => task.id !== taskId);
      }

      const board: Board = {
        columns: updatedColumns,
      };

      return {
        board,
      };
    });
  },
  moveTask: (
    taskId: number,
    targetId: number,
    sourceStatus: TaskStatus,
    targetStatus: TaskStatus
  ) => {
    set((state) => {
      const updatedColumns = new Map(state.board.columns);

      const activeIndex = updatedColumns
        .get(sourceStatus)!
        .tasks.findIndex((t) => t.id === taskId);
      const targetIndex = updatedColumns
        .get(targetStatus)!
        .tasks.findIndex((t) => t.id === targetId);

      if (sourceStatus === targetStatus) {
        const array = arrayMove(
          updatedColumns.get(sourceStatus)!.tasks,
          activeIndex,
          targetIndex
        );

        updatedColumns.set(targetStatus, {
          status: targetStatus,
          tasks: array,
        });

        return {
          board: {
            columns: updatedColumns,
          },
        };
      }

      const sourceTasks = updatedColumns.get(sourceStatus)!.tasks;

      // remove source task from previous column
      updatedColumns.set(sourceStatus, {
        status: sourceStatus,
        tasks: sourceTasks.filter((item) => item.id !== taskId),
      });

      // change task status to new status
      const updatedTask = sourceTasks[activeIndex];
      updatedTask.status = targetStatus;

      updatedColumns.set(targetStatus, {
        status: targetStatus,
        tasks: [
          ...updatedColumns.get(targetStatus)!.tasks.slice(0, targetIndex),
          updatedTask,
          ...updatedColumns.get(targetStatus)!.tasks.slice(targetIndex),
        ],
      });

      return {
        board: {
          columns: updatedColumns,
        },
      };
    });
  },

  addTask: (task) => {
    set((state) => {
      const updatedColumns = new Map(state.board.columns);

      if (!updatedColumns.get(task.status)) {
        updatedColumns.set(task.status, {
          status: task.status,
          tasks: [],
        });
      }

      updatedColumns.get(task.status)!.tasks.push(task);

      return {
        board: {
          columns: updatedColumns,
        },
      };
    });
  },
}));

export const useBoardStore = boardStore;
