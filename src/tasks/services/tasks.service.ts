import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import TasksRepository from '../repositories/tasks.repository';
import FilterTasksDto from '../dto/filter-tasks.dto';
import Task from '../entities/task.entity';
import CreateTaskDto from '../dto/create-task.dto';
import TaskStatus from '../dictionaries/task-status.enum';
import User from '../../auth/entities/user.entity';

@Injectable()
class TasksService {
  public constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  public async getManyTasks(
    filterTasksDto: FilterTasksDto,
    user: User,
  ): Promise<Task[]> {
    return this.tasksRepository.getManyTasks(filterTasksDto, user);
  }

  public async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    return this.tasksRepository.createNewTask(createTaskDto, user);
  }

  public async getOneTaskById(id: number, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!task) {
      throw TasksService.getTaskNotFoundException(id);
    }

    return task;
  }

  public async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getOneTaskById(id, user);

    return this.tasksRepository.updateTaskStatus(task, status);
  }

  public async deleteOneTaskById(id: number, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw TasksService.getTaskNotFoundException(id);
    }
  }

  private static getTaskNotFoundException(id: number): NotFoundException {
    return new NotFoundException(`Task with id = "${id}" does not exist`);
  }
}

export default TasksService;
