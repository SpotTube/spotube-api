import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
/*
    Custom imports for AuthService, jwt secret, etc...
*/
// import * as jwt from 'jsonwebtoken';

@Injectable()
export class WsJwtGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    console.log(client.handshake.headers);
    return true;
    // const client = context.switchToWs().getClient();
    // const cookies: string[] = client.handshake.headers.cookie.split('; ');
    // const authToken = cookies
    //   .find((cookie) => cookie.startsWith('jwt'))
    //   .split('=')[1];
    // const jwtPayload: JwtPayload = <JwtPayload>(
    //   jwt.verify(authToken, yourSecret)
    // );
    // const user: User = await this.authService.validateUser(jwtPayload);
    // // Bonus if you need to access your user after the guard
    // context.switchToWs().getData().user = user;
    // return Boolean(user);
  }
}
