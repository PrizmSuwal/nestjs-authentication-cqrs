import { Body, Controller, Delete, Get, Injectable, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { usersDTO } from '../users.dto';
import { FindAllUsersQuery } from '../queries/find-all-users.query';
import { FindUserByIdQuery } from '../queries/find-user-by-id.query';
import { CreateUserCommand } from '../commands/impl/create-user.command';
import { UpdateUserByIdCommand } from '../commands/impl/update-user-by-id.command';
import { DeleteUserByIdCommand } from '../commands/impl/delete-user-by-id.command';

@Injectable()
@Controller('users')
export class UsersController {
    constructor (
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ){}

    @Post('create')
    async createUser(@Body() users: usersDTO) {
        return await this.commandBus.execute(
            new CreateUserCommand(users),
        );
    }

    @Patch('edit/:id')
    async updateUser(
        @Param('id') id: number,
        @Body() users: usersDTO
    ){
        return await this.commandBus.execute(
            new UpdateUserByIdCommand(id, users),
        )
    }

    @Delete('delete/:id')
    async deleteUser(
        @Param('id') id: number
    ){
        return await this.commandBus.execute(
            new DeleteUserByIdCommand(id),
        )
    }

    @Get('list')
    async listUser(){
        return await this.queryBus.execute(
            new FindAllUsersQuery(),
        );
    }

    @Get(':id')
    async getUserById(@Param('id') id: number) {
        return await this.queryBus.execute(
            new FindUserByIdQuery(id),
        );
    }
}
