import { TaskStatus } from '@/types/task_status';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getColorByStatus(status: TaskStatus): string {
  switch (status) {
    case 'To do':
      return 'text-sky-500 border-t-sky-500';
    case 'In progress':
      return 'text-orange-500 border-t-orange-500';
    case 'Done':
      return 'text-green-500 border-t-green-500';
    default:
      return 'text-gray-400';
  }
}
