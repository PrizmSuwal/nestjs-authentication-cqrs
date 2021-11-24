import { Injectable } from '@nestjs/common';
import { users } from './users.mock';
import { usersDTO } from './users.dto';

@Injectable()
export class UsersService {
    public users = users;
  
    async findOne(username: string): Promise<usersDTO | undefined> {
        return this.users.find(user => user.username === username);
    }
}