import { createParamDecorator } from '@nestjs/common';
import User from '../entities/user.entity';

const GetUser = createParamDecorator(
  (
    // @ts-ignore - data decorator value is not used
    data,
    request,
  ): User => request.user,
);

export default GetUser;
