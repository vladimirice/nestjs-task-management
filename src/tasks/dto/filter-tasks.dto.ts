import { TaskStatus } from '../task.model';

export class FilterTasksDto {
  public readonly search: string;
  public readonly status: TaskStatus;
}
