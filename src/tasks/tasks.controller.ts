import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  public getAllTasks(@Query(ValidationPipe) filterTasksDto: FilterTasksDto): Task[] {
    if (Object.keys(filterTasksDto).length > 0) {
      return this.tasksService.getAllTasksWithFilters(filterTasksDto);
    }

    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  public getOneTaskById(@Param('id') id: string): Task {
    return this.tasksService.getOneTaskById(id);
  }

  @Delete('/:id')
  public deleteOneTaskById(@Param('id') id: string): void {
    this.tasksService.deleteOneTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  public updateOneTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
    return this.tasksService.updateOneTaskStatus(id, status);
  }
}
