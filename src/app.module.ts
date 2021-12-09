import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { config } from './config/ormconfig';
import { Auth0Module } from './auth0/auth0.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(config),
    Auth0Module,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}