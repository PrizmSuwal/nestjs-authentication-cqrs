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
import { FindUserByAuthIdHandler } from './queries/handlers/find-user-by-auth-id.handler';
import { FindUserByEmailHandler } from './queries/handlers/find-user-by-email.handler';
import { FindUserHandler } from './queries/handlers/find-user.handler';
import { HttpModule } from '@nestjs/axios';
import { Auth0Module } from 'src/auth0/auth0.module';

@Module({
  imports: [
    CqrsModule,
    HttpModule,
    Auth0Module,
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
    FindUserByAuthIdHandler,
    FindUserByEmailHandler,
    FindUserHandler
  ],
  controllers: [UsersController],
})

export class UsersModule {}
