import { MultiplicationSignIcon, TickDouble02Icon } from 'hugeicons-react';
import { Button } from '../ui/button';
import { useBoardStore } from '@/zustand/board-store';
import { useState } from 'react';
import { generateRandomId } from '@/lib/utils';
import { TaskStatus } from '@/types/task_status';

interface CreateTaskFormProps {
  /**
   * Function close the new task form
   */
  closeNewTaskForm: () => void;
  /**
   * This will be the status to new task
   * @type {TaskStatus}
   */
  status: TaskStatus;
}

export default function CreateTaskForm({
  closeNewTaskForm,
  status,
}: CreateTaskFormProps) {
  const { addTask } = useBoardStore();
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');

  const createNewTask = () => {
    addTask({
      id: generateRandomId(),
      title: newTitle,
      description: newDescription,
      status,
      position: 1,
    });
    closeNewTaskForm();
  };

  return (
    <form className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Enter task name"
        className="rounded-md bg-gray-100 p-2 text-zinc-800 focus:outline-none dark:bg-gray-800 dark:text-gray-200"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <textarea
        placeholder="Enter task description"
        className="resize-none rounded-md bg-gray-100 p-2 text-zinc-800 focus:outline-none dark:bg-gray-800 dark:text-gray-200"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <div className="flex items-center justify-end">
        <Button
          type="button"
          size={'icon'}
          variant={'ghost'}
          title="Cancelar"
          onClick={closeNewTaskForm}
        >
          <MultiplicationSignIcon size={14} />
        </Button>
        <Button
          type="button"
          size={'icon'}
          variant={'ghost'}
          title="Confirmar"
          onClick={createNewTask}
        >
          <TickDouble02Icon size={14} />
        </Button>
      </div>
    </form>
  );
}
