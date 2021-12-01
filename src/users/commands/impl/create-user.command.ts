import { usersDTO } from "../../../users/users.dto";

export class CreateUserCommand {
    constructor ( 
        public readonly users: usersDTO
    ) {}
}