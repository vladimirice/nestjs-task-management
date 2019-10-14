import {
  Body,
  Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import TasksService from '../services/tasks.service';
import FilterTasksDto from '../dto/filter-tasks.dto';
import Task from '../entities/task.entity';
import CreateTaskDto from '../dto/create-task.dto';
import TaskStatusValidationPipe from '../pipes/task-status-validation.pipe';
import TaskStatus from '../dictionaries/task-status.enum';
import User from '../../auth/entities/user.entity';
import GetUser from '../../auth/decorators/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  public async getManyTasks(
    @Query(ValidationPipe) filterTasksDto: FilterTasksDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getManyTasks(filterTasksDto, user);
  }

  @Get('/:id')
  public async getOneTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getOneTaskById(id, user);
  }

  @Delete('/:id')
  public async deleteOneTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.tasksService.deleteOneTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  public async updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}

export default TasksController;
