import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../../../users/entities/user.entity";
import { Repository } from "typeorm";
import { DeleteUserByIdCommand } from "../impl/delete-user-by-id.command";

@CommandHandler(DeleteUserByIdCommand)
export  class DeleteUserByIdHandler implements ICommandHandler<DeleteUserByIdCommand> {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>
    ){}
    
    async execute(command: DeleteUserByIdCommand){
        const { id } = command;
        await this.userRepository.delete(id);
    }
}