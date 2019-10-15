import {
  Body, Controller, Post, ValidationPipe,
} from '@nestjs/common';
import AuthService from '../services/auth.service';
import UserCredentialsDto from '../dto/user-credentials.dto';
import { ISignInResponse } from '../interfaces/sign-interfaces';

@Controller('auth')
class AuthController {
  public constructor(private authService: AuthService) {}

  @Post('/signUp')
  public async signUp(@Body(ValidationPipe) userCredentialsDto: UserCredentialsDto): Promise<void> {
    return this.authService.signUp(userCredentialsDto);
  }

  @Post('/signIn')
  public async signIn(@Body(ValidationPipe) userCredentialsDto: UserCredentialsDto): Promise<ISignInResponse> {
    return this.authService.signIn(userCredentialsDto);
  }
}

export default AuthController;
