import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { usersDTO } from '../users.dto';
import { AddUserCommand } from '../commands/impl/add-user.command';
import { GetAllUsers } from '../queries/get-user';
import { usersMock } from '../users.mock';

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
}
