import * as config from 'config';
import { IJwtConfig } from '../../common/interfaces/config-interfaces';

const jwtConfig: IJwtConfig = config.get('jwt');

export const jwtSecret = process.env.JWT_SECRET || jwtConfig.secret;
export const jwtExpiresIn = jwtConfig.expiresIn;
