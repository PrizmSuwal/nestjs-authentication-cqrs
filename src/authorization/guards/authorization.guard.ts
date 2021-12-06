import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';
import * as jwt from 'express-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUHT0_AUDIENCE: string;
  private AUHT0_DOMAIN: string;

  constructor(private configService: ConfigService){
    this.AUHT0_AUDIENCE = this.configService.get('AUTH0_AUDIENCE');
    this.AUHT0_DOMAIN = this.configService.get('AUTH0_DOMAIN');
  }

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {

    const req = context.getArgByIndex(0);
    const res = context.getArgByIndex(1);

    const checkJwt = promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri:  `${this.AUHT0_DOMAIN}.well-known/jwks.json`,
        }),
        audience: this.AUHT0_AUDIENCE,
        issuer: this.AUHT0_DOMAIN,
        algorithms: ['RS256']
      })
    )
    try{
      await checkJwt(req, res);
      return true;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
