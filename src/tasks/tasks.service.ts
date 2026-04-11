import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.enum';
import { CreateTaskDto } from './dto/creat-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SearchTask } from './dto/search-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { task } from './task.entity';
import { promises } from 'dns';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(task)
    private taskRepository: Repository<task>,
  ) {}
  async getTasks(searchTask: SearchTask): Promise<task[]> {
    const { status, description } = searchTask;
    const query = this.taskRepository.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (description) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:description) OR LOWER(task.description) LIKE LOWER(:description)',
        { description: `%${description}%` },
      );
    }
    const tasks = query.getMany();
    return tasks;
  }
  async creatTask(createTaskDto: CreateTaskDto): Promise<task> {
    const { title, description } = createTaskDto;
    const Task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.taskRepository.save(Task);
    return Task;
  }
  async getTaskById(id: string): Promise<task> {
    const found = await this.taskRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
  // searchTask(searchTask: SearchTask): Task[] {
  //   const { status, description } = searchTask;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (description) {
  //     tasks = tasks.filter((task) => {
  //       if (
  //         task.title.includes(description) ||
  //         task.description.includes(description)
  //       ) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });
  //   }
  //   return tasks;
  // }
  async deleteTaskById(id: string) {
    const Task = await this.taskRepository.delete(id);
    console.log(Task);
  }
  async updateStatus(id: string, updateTaskDto: UpdateTaskDto): Promise<task> {
    const { status } = updateTaskDto;
    const Task = await this.getTaskById(id);
    Task.status = status;
    this.taskRepository.save(Task);
    return Task;
  }
  // updateStatus(id: string, updateTaskDto: UpdateTaskDto): Task[] {
  //   const { status } = updateTaskDto;
  //   const task = this.getTaskById(id);
  //   if (task) {
  //     task.status = status;
  //   }
  //   return this.Tasks;
  // }
}
