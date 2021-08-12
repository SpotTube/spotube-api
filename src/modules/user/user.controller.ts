import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Delete,
  Param,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateProfileDTO, UserCreateDTO } from './dto';
import { UserService } from './user.service';
import { ValidationPipe } from '~/shared/pipe/validation.pipe';
import { JwtAuthGuard } from '~/modules/auth/jwt-auth.guard';

import { FilterQuery } from 'mongoose';
import { UserDocument } from './user.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '~/shared/plugins/multer';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body(new ValidationPipe()) userCreateDTO: UserCreateDTO) {
    const data = await this.userService.create(userCreateDTO);
    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(filter: FilterQuery<UserDocument>) {
    const users = await this.userService.findAll(filter);
    return users;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const user = await this.userService.delete(id);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req) {
    const user = await this.userService.findOne({ _id: req.user._id });
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  updateProfile(
    @UploadedFile() avatar: Express.Multer.File,
    @Request() req,
    @Body(new ValidationPipe()) createProfileDto: CreateProfileDTO,
  ) {
    createProfileDto.user_id = req.user.id;
    return this.userService.updateProfile(createProfileDto, avatar);
  }
}
