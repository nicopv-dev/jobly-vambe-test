import { create } from 'zustand';
import ColumnType from '@/types/column';
import { TaskStatus } from '@/types/task_status';
import { TASKS } from '@/utils/constants';
import Board from '@/types/board';

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
    sourceStatus: TaskStatus,
    targetStatus: TaskStatus,
    toIndex: number
  ) => void;
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
        board: {
          columns: updatedColumns,
        },
      };
    });
  },
  moveTask: (
    taskId: number,
    sourceStatus: TaskStatus,
    targetStatus: TaskStatus,
    toIndex: number
  ) => {
    set((state) => {
      const updatedColumns = new Map(state.board.columns);

      const sourceColumn = updatedColumns.get(sourceStatus);
      const targetColumn = updatedColumns.get(targetStatus);

      if (sourceColumn && targetColumn) {
        console.log('updating columns');
        const taskIndex = sourceColumn.tasks.findIndex(
          (task) => task.id === taskId
        );
        console.log('taskIndex', taskIndex);
        if (taskIndex !== -1) {
          const [movedTask] = targetColumn.tasks.splice(taskIndex, 1);
          movedTask.status = targetStatus;
          targetColumn.tasks.splice(toIndex, 0, movedTask);
        }
      }

      return {
        board: {
          columns: updatedColumns,
        },
      };
    });
  },
}));

export const useBoardStore = boardStore;
