import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.schema';
import { ILoginForm } from './../user/interfaces/user.interface';
import { UserService } from '../user/user.service';
import { FBApp } from '~/shared/plugins/facebook';
import { EUserPlatform } from 'src/types/User';
import { get } from 'lodash';
import { GoogleClient } from '~/shared/plugins/google';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(form: ILoginForm): Promise<User | undefined> {
    return await this.userService.login(form);
  }

  async login(user: ILoginForm) {
    const usr = await this.validateUser(user);
    return {
      data: { accessToken: this.jwtService.sign({ user: usr }) },
    };
  }

  async facebookLogin(accessToken: string) {
    console.log('accessToken', accessToken);

    const userProfile = await FBApp.api('me', {
      fields: 'picture.type(large),name,id,email',
      access_token: accessToken,
    });

    let user = await this.userService.findOne({
      email: userProfile.email,
    });

    if (!user) {
      user = await this.userService.create({
        password: Math.random().toString(36).substr(2, 8),
        fbProfileId: userProfile.id,
        email: userProfile.email,
        profile: { fullName: userProfile.name },
        // platform: EUserPlatform.FACEBOOK,
        avatar: get(userProfile, 'picture.data.url'),
      });
    }

    return { accessToken: this.jwtService.sign({ user }) };
  }

  async googleLogin(idToken: string) {
    const ticket = await GoogleClient.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      // // Or, if multiple clients access the backend:
      // //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    let user = await this.userService.findOne({
      email: payload.email,
    });
    if (!user) {
      user = await this.userService.create({
        password: Math.random().toString(36).substr(2, 8),
        email: payload.email,
        profile: { fullName: payload.name },
        // platform: EUserPlatform.GOOGLE,
        googleUserId: payload.sub,
        emailVerified: payload.email_verified,
        avatar: payload.picture,
      });
    }

    return { accessToken: this.jwtService.sign({ user }) };
  }
}
