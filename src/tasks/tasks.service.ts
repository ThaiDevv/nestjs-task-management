import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/creat-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SearchTask } from './dto/search-task.dto';
@Injectable()
export class TasksService {
  private Tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.Tasks;
  }
  creatTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.Tasks.push(task);
    return task;
  }
  getTaskById(id: string): Task | undefined {
    const task = this.Tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }
  searchTask(searchTask: SearchTask): Task[] {
    const { status, description } = searchTask;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (description) {
      tasks = tasks.filter((task) => {
        if (
          task.title.includes(description) ||
          task.description.includes(description)
        ) {
          return true;
        } else {
          return false;
        }
      });
    }
    return tasks;
  }
  deleteTaskById(id: string): Task[] {
    this.getTaskById(id);
    const newTasks = this.Tasks.filter((Task) => Task.id != id);
    return newTasks;
  }
  updateStatus(id: string, updateTaskDto: UpdateTaskDto): Task[] {
    const { status } = updateTaskDto;
    const task = this.getTaskById(id);
    if (task) {
      task.status = status;
    }
    return this.Tasks;
  }
}
