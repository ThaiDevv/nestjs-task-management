import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
@Injectable()
export class TasksService {
  private Tasks: Task[] = [
    {
      id: '1',
      title: 'Learn NestJS',
      description: 'Study controller and service',
      status: TaskStatus.OPEN,
    },
  ];
  getAllTasks(): Task[] {
    return this.Tasks;
  }
  creatTask(title: string, description: string): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.Tasks.push(task);
    return task;
  }
}
