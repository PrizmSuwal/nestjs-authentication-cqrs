import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { AuthorizationService } from '../services/authorization.service';

@Controller()
export class AuthorizationController {
    constructor(private readonly authorizationService: AuthorizationService){}

    @Get('/public')
    getPublic(): string {
        return this.authorizationService.getPublic();
    }

    @UseGuards(AuthorizationGuard)
    @Get('/protected')
    getProtected(): string {
        return this.authorizationService.getProtected();
    }
}
