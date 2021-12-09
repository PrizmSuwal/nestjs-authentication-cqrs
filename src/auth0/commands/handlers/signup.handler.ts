import { Inject, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth0Gateway } from "src/auth0/gateways/auth0-gateway";
import { Users } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { SignUpUserCommand } from "../signup.command";

@Injectable()
@CommandHandler(SignUpUserCommand)
export class SignUpUserHandler implements ICommandHandler<SignUpUserCommand> {
    constructor(
        @Inject('Auth0Gateway')
        private readonly auth0Gateway: Auth0Gateway,
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
    ){}
    
    async execute(command: SignUpUserCommand) {
        const { users } = command;
        const authId = await this.auth0Gateway.signup(users);

        let newUser = new Users();
        newUser.name = users.name;
        newUser.email = users.email;
        newUser.password = users.password;
        newUser.authId= `auth0|${authId}`;
        await this.userRepository.insert(newUser);
    }
}