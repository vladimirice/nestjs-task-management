import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '12345',
      title: 'Turtle',
      description: 'Feed it',
      status: TaskStatus.OPEN,
    },
  ];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getAllTasksWithFilters(filterTasksDto: FilterTasksDto): Task[] {
    let filteredTasks = [...this.tasks];

    const { search, status } = filterTasksDto;

    if (search) {
      filteredTasks = filteredTasks.filter((
        item: Task,
      ) => item.title.toLowerCase().includes(search) || item.description.toLowerCase().includes(search));
    }

    if (status) {
      filteredTasks = filteredTasks.filter((item: Task) => item.status === status);
    }

    return filteredTasks;
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  public getOneTaskById(id: string): Task {
    const task = this.getAllTasks().find((item) => item.id === id);

    if (!task) {
      throw new NotFoundException(`Task with id = "${id}" does not exist`);
    }

    return task;
  }

  public updateOneTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getOneTaskById(id);

    task.status = status;

    return task;
  }

  public deleteOneTaskById(id: string): void {
    const task = this.getOneTaskById(id);

    this.tasks = this.tasks.filter((item: Task) => item.id !== task.id);
  }
}
