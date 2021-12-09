import { Provider } from "@nestjs/common";
import { JwtStrategy } from "src/auth/strategies/jwt.strategy";

export const JwtStrategyProvider = {
    provide: 'JwtStrategy',
    useClass: JwtStrategy,
} as Provider;