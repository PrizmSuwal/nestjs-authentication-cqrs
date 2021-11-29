import { usersDTO } from "../users.dto";

export class GetAllUsers {
    constructor ( 
        public readonly users: usersDTO[],
    ) {}
}