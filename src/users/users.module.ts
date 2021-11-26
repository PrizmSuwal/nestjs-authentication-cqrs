import { Module } from '@nestjs/common';
import { UsersController } from './controllers/user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { AddUserHandler } from './commands/handlers/add-user.handler';
import { AddUserEventHandler } from './events/handler/user-added.event-handler';
import { AddUserCommand } from './commands/impl/add-user.command';
import { AddUserEvent } from './events/user-added.event';
import { GetAllUsers } from './queries/get-user';
import { GetAllUsersHandler } from './queries/handlers/get-user.handlers';

@Module({
  imports: [CqrsModule],
  providers: [
    AddUserCommand,
    AddUserHandler, 
    AddUserEvent,
    AddUserEventHandler, 
    GetAllUsers,
    GetAllUsersHandler
  ],
  controllers: [UsersController],
})

export class UsersModule {}
