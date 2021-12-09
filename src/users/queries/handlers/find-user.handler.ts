import { Injectable } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { FindUserQuery } from "../find-user.query";

@Injectable()
@QueryHandler(FindUserQuery)
export class FindUserHandler implements IQueryHandler<FindUserQuery>{
    constructor(
        @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    ){}

    async execute(query: FindUserQuery): Promise<Users> {
        return this.userRepository.findOneOrFail(query.userId);
    }
}