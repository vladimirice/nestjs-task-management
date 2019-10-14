import {
  Body,
  Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { TaskStatus } from './dictionaries/task-status.enum';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { FilterTasksDto } from './dto/filter-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  public async getManyTasks(@Query(ValidationPipe) filterTasksDto: FilterTasksDto): Promise<Task[]> {
    return this.tasksService.getManyTasks(filterTasksDto);
  }

  @Get('/:id')
  public async getOneTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getOneTaskById(id);
  }

  @Delete('/:id')
  public async deleteOneTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteOneTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  public async updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
