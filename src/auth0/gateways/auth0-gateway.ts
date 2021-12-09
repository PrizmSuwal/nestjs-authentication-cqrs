export interface Auth0Gateway {
    readonly signup: (users: {
        readonly name: string;
        readonly email: string;
        readonly password: string;
        }
    ) => Promise<string>;
}