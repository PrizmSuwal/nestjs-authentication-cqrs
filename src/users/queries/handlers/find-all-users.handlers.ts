import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/users/entities/user.entity";
import { usersDTO } from "src/users/users.dto";
import { Repository } from "typeorm";
import { FindAllUsersQuery } from "../find-all-users.query";

@QueryHandler(FindAllUsersQuery)
export class FindAllUsersHandler implements IQueryHandler<FindAllUsersQuery>{
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>
    ){}
   
    async execute(query: FindAllUsersQuery): Promise<usersDTO[]> {
        return this.userRepository.find()
    }
}