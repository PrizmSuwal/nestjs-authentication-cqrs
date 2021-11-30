import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { AddUserEvent } from "../../events/user-added.event";
import { usersMock } from "../../users.mock";
import { AddUserCommand } from "../impl/add-user.command";

@CommandHandler(AddUserCommand)
export  class AddUserHandler implements ICommandHandler<AddUserCommand> {
    public user = usersMock;
    constructor(private readonly eventBus: EventBus){}
    
    async execute(command: AddUserCommand){
        const { users } = command;
        if(users.name && users.password) {
            this.user.push(users);
        }
        this.eventBus.publish(
            new AddUserEvent(this.user)
        );
        return this.user;
    }
}