import { Provider } from "@nestjs/common";
import { Auth0GatewayService } from "../gateways/auth0-gateway.service";

export const Auth0GatewayProvider = {
    provide: 'Auth0Gateway',
    useClass: Auth0GatewayService,
} as Provider;