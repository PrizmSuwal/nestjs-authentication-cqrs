import { Body, Controller, Get, Inject, Injectable, Post, Request, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Auth0Gateway } from 'src/auth0/gateways/auth0-gateway';
import { Users } from 'src/users/entities/user.entity';
import { FindUserByAuthIdQuery } from 'src/users/queries/find-user-by-auth-id.query';
import { SignUpUserCommand } from '../../commands/signup.command';
import { Auth0Guard } from '../../guards/auth0.guard';
import { Auth0Service } from '../../services/auth0.service';
import { LoginRequest } from '../requests/login.request';
import { SignUpRequest } from '../requests/signup.request';

@Injectable()
@Controller()
export class Auth0Controller {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly auth0Service: Auth0Service,
        @Inject('Auth0Gateway')
        private readonly auth0Gateway: Auth0Gateway
    ){}

    @Get('/public')
    getPublic(): string {
        return this.auth0Service.getPublic();
    }

    @UseGuards(Auth0Guard)
    @Get('/protected')
    getProtected(@Request() req): string {
        return this.auth0Service.getProtected();
    }

    @Post('/signup')
    async signup(@Body() users: SignUpRequest)  {
        return await this.commandBus.execute(
            new SignUpUserCommand(users)
        );
    }
}
