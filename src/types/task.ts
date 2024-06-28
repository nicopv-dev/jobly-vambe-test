import type { TaskStatus } from './task_status';

export default interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  position: number;
}
