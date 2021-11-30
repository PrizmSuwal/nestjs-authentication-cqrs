import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserCommand } from "../impl/create-user.command";

@CommandHandler(CreateUserCommand)
export  class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>
    ){}
    
    async execute(command: CreateUserCommand){
        const { users } = command;
        let newUser = new Users();
        newUser.name = users.name;
        newUser.email = users.email;
        newUser.password = users.password;
        await this.userRepository.insert(newUser);
    }
}