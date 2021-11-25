import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { AddUserEvent } from "src/users/events/add-user.event";
import { usersMock } from "src/users/users.mock";
import { AddUserCommand } from "../impl/add-user.command";

@CommandHandler(AddUserCommand)
export  class AddUserHandler implements ICommandHandler<AddUserCommand> {
    public user = usersMock;
    constructor(private readonly eventBus: EventBus){}
    
    async execute(command: AddUserCommand){
        const { users } = command;
        this.user.push(users);
        console.log(this.user)
        this.eventBus.publish(
            new AddUserEvent(this.user)
        );
        return this.user;
    }
}