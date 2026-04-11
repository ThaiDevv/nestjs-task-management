import { TaskStatus } from '../tasks.enum';
import { IsEnum } from 'class-validator';
export class UpdateTaskDto {
  @IsEnum(TaskStatus)
  status!: TaskStatus;
}
