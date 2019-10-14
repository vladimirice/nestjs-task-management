import {
  BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import Task from '../../tasks/entities/task.entity';

@Entity({ name: 'persons' })
@Unique(['username'])
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}

export default User;
