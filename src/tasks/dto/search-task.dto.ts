import { TaskStatus } from '../tasks.model';
import { IsEnum, IsOptional, IsString } from 'class-validator';
export class SearchTask {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  description?: string;
}
