import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { Auth0Gateway } from "./auth0-gateway";
import * as dotenv from 'dotenv';
import { Users } from "src/users/entities/user.entity";

dotenv.config()

@Injectable()
export class Auth0GatewayService implements Auth0Gateway {
    constructor(
        private readonly httpService: HttpService,
        private readonly baseUrl = process.env.AUTH0_BASEURL,
    ){}
    
    async signup(users: Users): Promise<string>{
        const params = {
            client_id: process.env.AUTHO_CLIENTID,
            email:users.email,
            password: users.password,
            name: users.name
        }
        try {
            const result = await this.httpService.post(`${this.baseUrl}/signup`, params);
    
            console.log(result);
            return '0';
        }   catch (err) {
            console.log(err, 'Something went wrong');
        }
    }
}