import {
  IsString, Matches, MaxLength, MinLength,
} from 'class-validator';

class UserCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  public username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![\n.])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  public password: string;
}

export default UserCredentialsDto;
