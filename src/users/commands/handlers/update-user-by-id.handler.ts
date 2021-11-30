import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { UpdateUserByIdCommand } from "../impl/update-user-by-id.command";

@CommandHandler(UpdateUserByIdCommand)
export  class UpdateUserByIdHandler implements ICommandHandler<UpdateUserByIdCommand> {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>
    ){}
    
    async execute(command: UpdateUserByIdCommand){
        const { id, users } = command;
        const userFound = await this.userRepository.findOne(id);
        userFound.name = users.name;
        userFound.email = users.email;
        userFound.password = users.password;
        await this.userRepository.update(id, userFound);
    }
}