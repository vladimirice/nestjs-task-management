import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthTokenPayload } from '../interfaces/auth-interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import UsersRepository from '../repositories/users.repository';
import User from '../entities/user.entity';
import { jwtSecret } from '../helpers/jwt-config-helper';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  public async validate(payload: IAuthTokenPayload): Promise<User> {
    const { username } = payload;

    const user = await this.usersRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

export default JwtStrategy;
