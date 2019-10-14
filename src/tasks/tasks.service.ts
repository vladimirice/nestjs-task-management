import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './repositories/tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { TaskStatus } from './dictionaries/task-status.enum';
import { FilterTasksDto } from './dto/filter-tasks.dto';

@Injectable()
export class TasksService {
  public constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  public async getManyTasks(filterTasksDto: FilterTasksDto): Promise<Task[]> {
    return this.tasksRepository.getManyTasks(filterTasksDto);
  }

  public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createNewTask(createTaskDto);
  }

  public async getOneTaskById(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne(id);

    if (!task) {
      throw TasksService.getTaskNotFoundException(id);
    }

    return task;
  }

  public async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getOneTaskById(id);

    return this.tasksRepository.updateTaskStatus(task, status);
  }

  public async deleteOneTaskById(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw TasksService.getTaskNotFoundException(id);
    }
  }

  private static getTaskNotFoundException(id: number): NotFoundException {
    return new NotFoundException(`Task with id = "${id}" does not exist`);
  }
}
