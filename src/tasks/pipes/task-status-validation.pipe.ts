import { PipeTransform } from '@nestjs/common/interfaces/features/pipe-transform.interface';
import { BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../dictionaries/task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  private readonly validStatuses: string[] = Object.keys(TaskStatus);

  transform(value: string): unknown {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }

    return value;
  }

  private isStatusValid(value: string): boolean {
    return this.validStatuses.includes(value);
  }
}
