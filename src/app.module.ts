import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { config } from './config/ormconfig';

@Module({
  imports: [
    AuthModule, 
    UsersModule,
    TypeOrmModule.forRoot(config),
  ],
  controllers: [AppController],
})
export class AppModule {}