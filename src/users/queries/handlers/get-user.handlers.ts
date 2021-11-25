import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { usersMock } from "src/users/users.mock";
import { GetAllUsers } from "../get-user";

@QueryHandler(GetAllUsers)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsers>{
    private users = usersMock;
   
    async execute(query: GetAllUsers): Promise<any> {
        return this.users;
    }
}