import Task from '@/types/task';

export const TASKS: Task[] = [
  {
    id: 1,
    title: '[BACKEND] Conection database',
    description: `Connect proyjecto with Postgresql`,
    status: 'To do',
    position: 1,
  },
  {
    id: 2,
    title: '[FRONTEND] Create project with Next.js',
    description: `Create project with Next.js v14 with typescript💎`,
    status: 'In progress',
    position: 1,
  },
  {
    id: 3,
    title: '[UX] Create web design',
    description: `Create web design with figma web - responsive version`,
    status: 'Done',
    position: 1,
  },
  {
    id: 4,
    title: '[DB] Create database diagram model',
    description: `Create database diagram model with web resource (DB Diagram)`,
    status: 'To do',
    position: 2,
  },
];
