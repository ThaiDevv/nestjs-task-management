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
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get(':id')
  getTask(@Param('id') id: string): Promise<task> {
    return this.tasksService.getTaskById(id);
  }
  @Get()
  getTasks(@Query() filterDto: SearchTask): Promise<task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task | undefined {
  //   return this.tasksService.getTaskById(id);
  // }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<task> {
    return this.tasksService.creatTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<task> {
    return this.tasksService.updateStatus(id, updateTaskDto);
  }
}
