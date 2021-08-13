import { Injectable } from '@nestjs/common';
import { get } from 'lodash';
import { use } from 'passport';

import { EUserPlatform } from 'src/types/User';
import { UserService } from '../user/user.service';
const FacebookTokenStrategy = require('passport-facebook-token');
@Injectable()
export class FacebookStrategy {
  constructor(private userService: UserService) {
    this.init();
  }

  private init(): void {
    use(
      'facebook',
      new FacebookTokenStrategy(
        {
          clientID: process.env.FB_APP_ID,
          clientSecret: process.env.FB_APP_SECRET,
          profileFields: ['id', 'name', 'displayName', 'emails', 'photos'],
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: Function,
        ) => {
          try {
            const providerData = profile._json;
            let email: string = profile.emails.shift().value;

            //  Conditional if facebook doesn't return email
            if (!email || email === '')
              email = `${profile.id}@${profile.provider}.com`;

            const existingUser = await this.userService.findOne({
              email: email,
            });

            if (existingUser) {
              return done(null, existingUser);
            }

            const user = await this.userService.create({
              password: Math.random().toString(36).substr(2, 8),
              fbProfileId: profile.id,
              email,
              profile: { fullName: profile.displayName },
              avatar: get(providerData, 'picture.data.url'),
            });

            done(null, user);
          } catch (err) {
            done(err, null);
          }
        },
      ),
    );
  }
}
