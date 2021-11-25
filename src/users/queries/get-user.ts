import { usersDTO } from "src/users/users.dto";

export class GetAllUsers {
    constructor ( 
        public readonly users: usersDTO[],
    ) {}
}