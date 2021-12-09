import { Injectable } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { FindUserByAuthIdQuery } from "../find-user-by-auth-id.query";
import { UsersInfo } from "../find-user.query";

@Injectable()
@QueryHandler(FindUserByAuthIdQuery)
export class FindUserByAuthIdHandler implements IQueryHandler<FindUserByAuthIdQuery>{
    constructor(
        @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    ){}

    async execute(query: FindUserByAuthIdQuery): Promise<UsersInfo>{
        const user = await this.userRepository.findOneOrFail({
            authId: query.authId,
        });
        return new UsersInfo(
            user.id,
            user.name,
            user.email,
            user.authId,
        )
    }
}