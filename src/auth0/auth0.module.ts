import { HttpService, HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { SignUpUserHandler } from './commands/handlers/signup.handler';
import { VerifyUserEmailHandler } from './commands/handlers/verify-user-email.handler';
import { Auth0Controller } from './http/controllers/auth0.controller';
import { Auth0GatewayProvider } from './providers/auth0-gateway.provider';
import { JwtStrategyProvider } from './providers/strategy.provider';
import { Auth0Service } from './services/auth0.service';

@Module({
  imports: [ 
    CqrsModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt'}),
    HttpModule,
    TypeOrmModule.forFeature([
      Users
    ]),
  ],
  providers: [
    Auth0Service,
    SignUpUserHandler,
    VerifyUserEmailHandler,
    Auth0GatewayProvider,
    JwtStrategyProvider,
    HttpService
  ],
  exports: [PassportModule, Auth0GatewayProvider],
  controllers: [Auth0Controller],
})
export class Auth0Module {}
