import { usersDTO } from "src/users/users.dto";

export class CreateUserCommand {
    constructor ( 
        public readonly users: usersDTO
    ) {}
}