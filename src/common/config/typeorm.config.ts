import * as config from 'config';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IDbConfig } from '../interfaces/config-interfaces';

const dbConfig: IDbConfig = config.get('db');

const TypeOrmOptions: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT ? +process.env.RDS_PORT : dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [`${__dirname}/../../**/*.entity.{js,ts}`],
  synchronize: dbConfig.synchronize,
};

export default TypeOrmOptions;
