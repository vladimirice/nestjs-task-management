import { EntityRepository, Repository } from 'typeorm';
import TaskStatus from '../dictionaries/task-status.enum';
import CreateTaskDto from '../dto/create-task.dto';
import Task from '../entities/task.entity';
import FilterTasksDto from '../dto/filter-tasks.dto';
import User from '../../auth/entities/user.entity';

@EntityRepository(Task)
class TasksRepository extends Repository<Task> {
  public async getManyTasks(
    filterTasksDto: FilterTasksDto,
    user: User,
  ): Promise<Task[]> {
    const { status, search } = filterTasksDto;

    const alias = 'task';
    const queryBuilder = this.createQueryBuilder(alias)
      .andWhere(`${alias}.userId = :userId`, { userId: user.id })
    ;

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

  public async createNewTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    const task = new Task();

    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.status = TaskStatus.OPEN;

    task.user = user;

    await task.save();

    delete task.user;

    return task;
  }

  public async updateTaskStatus(task: Task, status: TaskStatus): Promise<Task> {
    task.status = status;

    await task.save();

    return task;
  }
}

export default TasksRepository;
