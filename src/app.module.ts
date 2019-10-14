import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import TypeOrmOptions from './common/config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmOptions),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
