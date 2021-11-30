import { Module } from '@nestjs/common';
import { UsersController } from './controllers/user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { AddUserHandler } from './commands/handlers/add-user.handler';
import { AddUserEventHandler } from './events/handler/user-added.event-handler';
import { AddUserCommand } from './commands/impl/add-user.command';
import { AddUserEvent } from './events/user-added.event';
import { GetAllUsers } from './queries/get-user';
import { GetAllUsersHandler } from './queries/handlers/get-user.handlers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { FindUserById } from './queries/find-user-by-id';
import { FindUserByIdHandler } from './queries/handlers/find-user-by-id.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      Users
    ]),
  ],
  providers: [
    AddUserCommand,
    AddUserHandler, 
    AddUserEvent,
    AddUserEventHandler, 
    GetAllUsers,
    GetAllUsersHandler,
    CreateUserCommand,
    CreateUserHandler,
    FindUserById,
    FindUserByIdHandler
  ],
  controllers: [UsersController],
})

export class UsersModule {}
