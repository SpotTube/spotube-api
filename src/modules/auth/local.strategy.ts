import { ILoginForm } from './../user/interfaces/user.interface';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(form: ILoginForm): Promise<any> {
    console.log(form);
    const user = await this.authService.validateUser(form);
    console.log(user);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
