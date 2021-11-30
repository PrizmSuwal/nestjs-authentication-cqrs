import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { usersMock } from 'src/users/users.mock';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}
  public users = usersMock;

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.users.find(user => user.name === username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}