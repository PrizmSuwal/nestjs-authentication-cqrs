import { usersDTO } from "src/users/users.dto";

export class AddUserCommand {
    constructor ( 
        public readonly users: usersDTO
    ) {}
}