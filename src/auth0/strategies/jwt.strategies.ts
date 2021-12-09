import { Injectable } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';
import { PassportStrategy } from '@nestjs/passport';
import { JwtStrategyInterface } from './jwt-strategies.interface';
import * as dotenv from 'dotenv';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { QueryBus } from '@nestjs/cqrs';
import { FindUserByAuthIdQuery } from 'src/users/queries/find-user-by-auth-id.query';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) implements JwtStrategyInterface{
    constructor(public readonly queryBus: QueryBus){
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri:`${process.env.AUHT0_DOMAIN}.well-known/jwks.json`,
            }),

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: process.env.AUHT0_AUDIENCE,
            issuer: process.env.AUHT0_DOMAIN,
            algorithms: ['RS256'],
        });
    }

    async validate(
        payload: Record<string, string>,
    ): Promise<Record<string, string>> {
        return await this.queryBus.execute(new FindUserByAuthIdQuery(payload.sub));
    }
}
