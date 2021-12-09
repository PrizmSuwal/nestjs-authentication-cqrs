import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../../../users/entities/user.entity";
import { Repository } from "typeorm";
import { FindUserByEmailQuery } from "../find-user-by-email.query";

@QueryHandler(FindUserByEmailQuery)
export class FindUserByEmailHandler implements IQueryHandler<FindUserByEmailQuery> {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>
    ){}

    async execute(query: FindUserByEmailQuery) : Promise<Users> {
        const user = await this.userRepository.findOneOrFail(query.email);
        return user;
    }
}
