import { MultiplicationSignIcon, TickDouble02Icon } from 'hugeicons-react';
import { Button } from '../ui/button';
import { useBoardStore } from '@/zustand/board-store';
import { generateRandomId } from '@/lib/utils';
import { TaskStatus } from '@/types/task_status';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TaskForm, TaskSchema } from '@/types/task';
import { zodResolver } from '@hookform/resolvers/zod';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const createNewTask: SubmitHandler<TaskForm> = ({ title, description }) => {
    addTask({
      id: generateRandomId(),
      title,
      description,
      status,
      position: 1,
    });
    closeNewTaskForm();
  };

  return (
    <form
      className="flex flex-col gap-2 rounded-md border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 ease-in-out hover:border-purple-400 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
      onSubmit={handleSubmit(createNewTask)}
    >
      <input
        type="text"
        placeholder="Enter task name"
        className="rounded-md bg-gray-100 p-2 text-sm text-zinc-800 focus:outline-none dark:bg-gray-800 dark:text-gray-200"
        {...register('title')}
      />
      {errors.title && (
        <span className="text-xs text-red-500">{errors.title.message}</span>
      )}
      <textarea
        placeholder="Enter task description"
        className="resize-none rounded-md bg-gray-100 p-2 text-sm text-zinc-800 focus:outline-none dark:bg-gray-800 dark:text-gray-200"
        {...register('description')}
      />
      {errors.description && (
        <span className="text-xs text-red-500">
          {errors.description.message}
        </span>
      )}
      {/* Actions */}
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
        <Button type="submit" size={'icon'} variant={'ghost'} title="Confirmar">
          <TickDouble02Icon size={14} />
        </Button>
      </div>
    </form>
  );
}
