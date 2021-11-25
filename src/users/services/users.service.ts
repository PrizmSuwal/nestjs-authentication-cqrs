import { Injectable } from '@nestjs/common';
import { usersMock } from '../users.mock';
import { usersDTO } from '../users.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AddUserCommand } from '../commands/impl/add-user.command';
import { GetAllUsers } from '../queries/get-user';

@Injectable()
export class UsersService {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus
    ) {}
    public users = usersMock;

    async findOne(username: string): Promise<usersDTO | undefined> {
        return this.users.find(user => user.username === username);
    }

    async addUser(users: usersDTO) {
        return await this.commandBus.execute(
            new AddUserCommand(users),
        );
    }

    async listUser(){
        return await this.queryBus.execute(
            new GetAllUsers(this.users),
        )
    }
}