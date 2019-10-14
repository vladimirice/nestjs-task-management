import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import User from '../entities/user.entity';
import UserCredentialsDto from '../dto/user-credentials.dto';
import { UNIQUE_CONSTRAINT_VIOLATION } from '../../common/orm/dictionaries/error-codes-dictionary';
import { compareStringHashes, hashStringWithSalt } from '../helpers/crypto-helper';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async signUp(userCredentialsDto: UserCredentialsDto): Promise<void> {
    const { username } = userCredentialsDto;

    const { salt, hash: password } = await hashStringWithSalt(userCredentialsDto.password);

    const user = new User();

    user.username = username;
    user.salt     = salt;
    user.password = password;

    try {
      await user.save();
    } catch (error) {
      if (error.code === UNIQUE_CONSTRAINT_VIOLATION) {
        throw new ConflictException('Username already exists');
      }

      throw error;
    }
  }

  public async signIn(userCredentialsDto: UserCredentialsDto): Promise<User | null> {
    const { username, password } = userCredentialsDto;

    const user = await this.findOne({ username });

    if (!user) {
      return null;
    }

    const hashMatch = await compareStringHashes(password, user.salt, user.password);

    if (!hashMatch) {
      return null;
    }

    return user;
  }
}

export default UsersRepository;
