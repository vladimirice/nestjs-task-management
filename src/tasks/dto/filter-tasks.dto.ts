import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../dictionaries/task-status.enum';

export class FilterTasksDto {
  @IsOptional()
  @IsIn(Object.keys(TaskStatus))
  public readonly search: string;

  @IsOptional()
  @IsNotEmpty()
  public readonly status: TaskStatus;
}
