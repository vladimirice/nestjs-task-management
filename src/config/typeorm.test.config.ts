import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'vladimir',
  password: 'vladimir',
  database: 'tasks',
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  synchronize: true,
};
