import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { usersDTO } from "src/users/users.dto";
import { usersMock } from "../../users.mock";
import { GetAllUsers } from "../get-user";

@QueryHandler(GetAllUsers)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsers>{
    private users = usersMock;
   
    async execute(query: GetAllUsers): Promise<usersDTO[]> {
        return this.users;
    }
}