import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Res,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { ILoginForm } from '../user/interfaces/user.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() user: ILoginForm, @Res() res: Response) {
    const { data } = await this.authService.login(user);
    console.log('ok');
    res.set('Authorization', 'Bearer ' + data.accessToken);
    res.cookie('token', data.accessToken);
    res.status(HttpStatus.OK).send({
      data,
    });
    // res.setHeader('Authorization', `Bearer ${data.accessToken}`);
    // return data;
  }

  @Get('login/facebook')
  async facebookLogin(@Query('access_token') accessToken: string) {
    return await this.authService.facebookLogin(accessToken);
  }

  @Get('login/google')
  async googleLogin(@Query('id_token') idToken: string) {
    return await this.authService.googleLogin(idToken);
  }

  // @Get('google')
  // @UseGuards(AuthGuard('google'))
  // gg() {
  //   return 'ok';
  // }

  // @Get('google/redirect')
  // @UseGuards(AuthGuard('google'))
  // ggre() {
  //   return 'ok';
  // }
  

  @Delete('logout')
  async logout(@Res() res: Response) {
    res.removeHeader('Authorization');
    res.clearCookie('token');
    res.status(HttpStatus.OK).end();
  }
}
