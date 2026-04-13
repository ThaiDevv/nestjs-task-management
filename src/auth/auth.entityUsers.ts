import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { task } from '../tasks/task.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ select: false })
  password!: string;
  @OneToMany(() => task, (task) => task.user)
  tasks!: task;
}
