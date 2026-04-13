import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './tasks.enum';
import { User } from '../auth/auth.entityUsers';
import { Exclude } from 'class-transformer';
@Entity()
export class task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  status!: TaskStatus;
  @Exclude({ toPlainOnly: true })
  @ManyToOne(() => User, (User) => User.tasks)
  user!: User;
}
