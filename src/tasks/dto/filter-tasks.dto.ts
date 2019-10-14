import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import TaskStatus from '../dictionaries/task-status.enum';

class FilterTasksDto {
  @IsOptional()
  @IsIn(Object.keys(TaskStatus))
  public readonly search: string;

  @IsOptional()
  @IsNotEmpty()
  public readonly status: TaskStatus;
}

export default FilterTasksDto;
