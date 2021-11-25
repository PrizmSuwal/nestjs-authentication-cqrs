import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { AddUserHandler } from './commands/handlers/add-user.handler';
import { AddUserEventHandler } from './events/handler/add-user.event-handler';
import { AddUserCommand } from './commands/impl/add-user.command';
import { AddUserEvent } from './events/add-user.event';

@Module({
  imports: [CqrsModule],
  providers: [
    UsersService, 
    AddUserCommand,
    AddUserHandler, 
    AddUserEvent,
    AddUserEventHandler, 
  ],
  exports: [UsersService],
  controllers: [UsersController],
})

export class UsersModule {}
