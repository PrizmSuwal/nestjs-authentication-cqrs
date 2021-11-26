import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { usersMock } from "../../users.mock";
import { AddUserEvent } from "../user-added.event";

@EventsHandler(AddUserEvent)
export class AddUserEventHandler implements IEventHandler<AddUserEvent>{
    public user = usersMock;
    handle(event: AddUserEvent) {
        console.log("User Added");
        //logic
        //send email
    }
}