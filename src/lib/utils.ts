import { TaskStatus } from '@/types/task_status';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * This function merge classes from tailwind and clsx
 *
 * @param {ClassValue[]} inputs The classes to merge.
 * @returns {string} A string with all classes merged.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * This function return the className color by status
 *
 * @param {TaskStatus} status The status task to evaluate
 * @returns {string} A string with all style classes
 */
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

export function generateRandomId() {
  return Math.floor(Math.random() * 10001);
}
