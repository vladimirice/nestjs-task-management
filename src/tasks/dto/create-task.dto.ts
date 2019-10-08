import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  public readonly title: string;

  @IsNotEmpty()
  public readonly description: string;
}
