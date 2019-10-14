import { EntityRepository, Repository } from 'typeorm';
import { TaskStatus } from '../dictionaries/task-status.enum';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../entities/task.entity';
import { FilterTasksDto } from '../dto/filter-tasks.dto';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  public async getManyTasks(filterTasksDto: FilterTasksDto): Promise<Task[]> {
    const { status, search } = filterTasksDto;

    const alias = 'task';
    const queryBuilder = this.createQueryBuilder(alias);

    if (status) {
      queryBuilder.andWhere(`${alias}.status = :status`, { status });
    }

    if (search) {
      queryBuilder.andWhere(
        `(${alias}.title LIKE :search OR ${alias}.description LIKE :search)`,
        { search: `%${search}%` },
      );
    }

    return queryBuilder.getMany();
  }

  public async createNewTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();

    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.status = TaskStatus.OPEN;

    await task.save();

    return task;
  }

  public async updateTaskStatus(task: Task, status: TaskStatus): Promise<Task> {
    task.status = status;

    await task.save();

    return task;
  }
}
