import { TaskStatus } from '../tasks.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';
export class SearchTask {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  description?: string;
}
