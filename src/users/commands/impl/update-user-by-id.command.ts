import { usersDTO } from "src/users/users.dto";

export class UpdateUserByIdCommand {
    constructor ( 
        public readonly id: number,
        public readonly users: usersDTO
    ){}
}