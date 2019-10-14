import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ISignInResponse } from '../interfaces/sign-interfaces';
import { IAuthTokenPayload } from '../interfaces/auth-interfaces';
import UsersRepository from '../repositories/users.repository';
import UserCredentialsDto from '../dto/user-credentials.dto';
import User from '../entities/user.entity';

@Injectable()
class AuthService {
  public constructor(
    @InjectRepository(UsersRepository)
      private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  public async signUp(userCredentialsDto: UserCredentialsDto): Promise<void> {
    return this.usersRepository.signUp(userCredentialsDto);
  }

  public async signIn(userCredentialsDto: UserCredentialsDto): Promise<ISignInResponse> {
    const user = await this.usersRepository.signIn(userCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Username or password not correct');
    }

    const token = await this.generateNewToken(user);

    return { token };
  }

  private async generateNewToken(user: User): Promise<string> {
    const payload: IAuthTokenPayload = { username: user.username };

    return this.jwtService.signAsync(payload);
  }
}

export default AuthService;
