import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.enum';
import { CreateTaskDto } from './dto/creat-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SearchTask } from './dto/search-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { task } from './task.entity';
import { User } from '../auth/auth.entityUsers';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(task)
    private taskRepository: Repository<task>,
  ) {}
  async getTasks(searchTask: SearchTask, user: User): Promise<task[]> {
    const { status, description } = searchTask;
    const query = this.taskRepository.createQueryBuilder('task');
    query.andWhere({ user });
    if (status) {
      query.andWhere('task.status LIKE :status', {
        status: `%${status}%`,
      });
    }

    if (description) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:description) OR LOWER(task.description) LIKE LOWER(:description))',
        { description: `%${description}%` },
      );
    }
    const tasks = query.getMany();
    return tasks;
  }
  async creatTask(createTaskDto: CreateTaskDto, user: User): Promise<task> {
    const { title, description } = createTaskDto;
    const Task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.taskRepository.save(Task);
    return Task;
  }
  async getTaskById(id: string, user: User): Promise<task> {
    const found = await this.taskRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
  async updateStatus(
    id: string,
    user: User,
    updateTaskDto: UpdateTaskDto,
  ): Promise<task> {
    const { status } = updateTaskDto;
    const Task = await this.getTaskById(id, user);
    Task.status = status;
    void this.taskRepository.save(Task);
    return Task;
  }
  async deleteTask(id: string, user: User): Promise<task> {
    const Task = await this.getTaskById(id, user);
    await this.taskRepository.remove(Task);
    return Task;
  }
}
