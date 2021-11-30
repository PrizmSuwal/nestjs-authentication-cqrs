import { Module } from '@nestjs/common';
import { UsersController } from './controllers/user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { AddUserEventHandler } from './events/handler/user-added.event-handler';
import { FindAllUsersHandler } from './queries/handlers/find-all-users.handlers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { FindUserByIdHandler } from './queries/handlers/find-user-by-id.handler';
import { UpdateUserByIdHandler } from './commands/handlers/update-user-by-id.handler';
import { DeleteUserByIdHandler } from './commands/handlers/delete-user-by-id.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      Users
    ]),
  ],
  providers: [
    AddUserEventHandler, 
    FindAllUsersHandler,
    CreateUserHandler,
    FindUserByIdHandler,
    UpdateUserByIdHandler,
    DeleteUserByIdHandler,
  ],
  controllers: [UsersController],
})

export class UsersModule {}
