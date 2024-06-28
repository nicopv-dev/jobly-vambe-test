import Task from './task';
import { TaskStatus } from './task_status';

export default interface ColumnType {
  status: TaskStatus;

  tasks: Task[];
}
