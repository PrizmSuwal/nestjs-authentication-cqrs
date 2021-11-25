import { Injectable } from '@nestjs/common';
import { usersMock } from '../users.mock';
import { usersDTO } from '../users.dto';
import { CommandBus } from '@nestjs/cqrs';
import { AddUserCommand } from '../commands/impl/add-user.command';

@Injectable()
export class UsersService {
    constructor(private commandBus: CommandBus) {}
    public users = usersMock;

    async findOne(username: string): Promise<usersDTO | undefined> {
        return this.users.find(user => user.username === username);
    }

    async addUser(users: usersDTO) {
        return await this.commandBus.execute(
            new AddUserCommand(users),
        );
    }
}