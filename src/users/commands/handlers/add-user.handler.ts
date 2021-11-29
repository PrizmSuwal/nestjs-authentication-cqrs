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
        console.log('hereeee');
        if(users.userId && users.username && users.password) {
            this.user.push(users);
        }
        this.eventBus.publish(
            new AddUserEvent(this.user)
        );
        console.log(this.user)
        return this.user;
    }
}