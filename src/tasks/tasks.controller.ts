import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/creat-task.dto';
import { SearchTask } from './dto/search-task.dto';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/auth.entityUsers';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getTask(@Param('id') id: string, @GetUser() user: User): Promise<task> {
    return this.tasksService.getTaskById(id, user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getTasks(
    @Query() filterDto: SearchTask,
    @GetUser() user: User,
  ): Promise<task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<task> {
    return this.tasksService.creatTask(createTaskDto, user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User) {
    this.tasksService.deleteTask(id, user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<task> {
    return this.tasksService.updateStatus(id, user, updateTaskDto);
  }
}
