import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AddUserEvent } from "../user-added.event";

@EventsHandler(AddUserEvent)
export class AddUserEventHandler implements IEventHandler<AddUserEvent>{
    handle(event: AddUserEvent) {
        console.log("User Added");
        //logic
        //send email
    }
}