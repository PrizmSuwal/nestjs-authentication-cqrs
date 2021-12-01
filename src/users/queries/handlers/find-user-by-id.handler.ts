import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../../../users/entities/user.entity";
import { Repository } from "typeorm";
import { FindUserByIdQuery } from "../find-user-by-id.query";

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdHandler implements IQueryHandler<FindUserByIdQuery> {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>
    ){}

    async execute(query: FindUserByIdQuery) : Promise<Users> {
        const user = await this.userRepository.findOneOrFail(query.id);
        return user;
    }
}
