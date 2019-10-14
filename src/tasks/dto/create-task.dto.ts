import { IsNotEmpty } from 'class-validator';

class CreateTaskDto {
  @IsNotEmpty()
  public readonly title: string;

  @IsNotEmpty()
  public readonly description: string;
}

export default CreateTaskDto;
