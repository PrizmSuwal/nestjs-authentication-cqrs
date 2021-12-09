export class FindUserQuery {
    constructor(public readonly userId: string){}
}

export class UsersInfo {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly email: string,
        readonly authId: string,
    ){}
}