import { z } from 'zod';
import type { TaskStatus } from './task_status';
import { title } from 'process';

export default interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  position: number;
}

export const TaskSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'Title is required',
    })
    .max(100),
  description: z
    .string()
    .min(1, {
      message: 'Description is required',
    })
    .max(1000),
});

export type TaskForm = z.infer<typeof TaskSchema>;
