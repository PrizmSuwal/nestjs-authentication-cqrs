import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { AddUserEvent } from "src/users/events/add-user.event";
import { users } from "src/users/users.mock";
import { AddUserCommand } from "../impl/add-user.command";

@CommandHandler(AddUserCommand)
export  class AddUserHandler implements ICommandHandler<AddUserCommand> {
    public user = users;
    constructor(private readonly eventBus: EventBus){}
    
    async execute(command: AddUserCommand){
        const { users } = command;
        const user = this.user.push(users);
        this.eventBus.publish(new AddUserEvent(users));
        return this.user;
    }
}