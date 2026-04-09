import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/creat-task.dto';
import { SearchTask } from './dto/search-task.dto';
import type { Task } from './tasks.model';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: SearchTask): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.searchTask(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task | undefined {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.creatTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Task[] {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Task[] {
    return this.tasksService.updateStatus(id, updateTaskDto);
  }
}
