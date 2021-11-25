import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { users } from "src/users/users.mock";
import { AddUserEvent } from "../add-user.event";

@EventsHandler(AddUserEvent)
export class AddUserEventHandler implements IEventHandler<AddUserEvent>{
    public user = users;
    handle(event: AddUserEvent) {
        console.log("User Added");
        //logic
        //send email
    }
}