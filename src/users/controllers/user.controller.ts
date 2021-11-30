import { Body, Controller, Get, Inject, Injectable, Param, Post, Query, Request, Response } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { usersDTO } from '../users.dto';
import { AddUserCommand } from '../commands/impl/add-user.command';
import { GetAllUsers } from '../queries/get-user';
import { usersMock } from '../users.mock';
import { FindUserById } from '../queries/find-user-by-id';
import { CreateUserCommand } from '../commands/impl/create-user.command';

@Injectable()
@Controller('users')
export class UsersController {
    constructor (
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ){}
    public users = usersMock;

    @Post('add')
    async addUser(@Body() users: usersDTO) {
        return await this.commandBus.execute(
            new AddUserCommand(users),
        );
    }

    @Get('list')
    async listUser(){
        return await this.queryBus.execute(
            new GetAllUsers(this.users),
        );
    }

    @Post('create')
    async createUser(@Body() users: usersDTO) {
        return await this.commandBus.execute(
            new CreateUserCommand(users),
        );
    }

    @Get(':id')
    async getUserById(@Param('id') id: number) {
        return await this.queryBus.execute(
            new FindUserById(id),
        );
    }
}
