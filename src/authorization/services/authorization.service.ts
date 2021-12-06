import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorizationService {
    getPublic(): string {
        return 'Welcome public';
    }

    getProtected(): string {
        return 'Welcome protected user';
    }
} 
