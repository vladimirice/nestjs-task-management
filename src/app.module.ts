import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmOptions } from './config/typeorm.test.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmOptions),
    TasksModule,
  ],
})
export class AppModule {}
