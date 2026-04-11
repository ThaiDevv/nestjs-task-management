import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { task } from './task.entity';
@Module({
  imports: [TypeOrmModule.forFeature([task])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
