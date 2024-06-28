import ColumnType from './column';
import { TaskStatus } from './task_status';

export default interface Board {
  columns: Map<TaskStatus, ColumnType>;
}
