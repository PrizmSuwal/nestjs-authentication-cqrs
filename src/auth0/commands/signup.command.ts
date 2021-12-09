export class SignUpUserCommand {
    constructor(
        readonly users: {
            readonly name: string;
            readonly email: string;
            readonly password: string;
        }
    ){}
}