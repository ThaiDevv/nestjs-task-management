import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'tasks-management',
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        poolSize: 10,
        keepAlive: true,
        statement_timeout: 10000,
      },
    }),
  ],
})
export class AppModule {}
