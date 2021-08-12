import { ILoginForm } from './interfaces/user.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { FilterQuery, Model, PaginateModel, PaginateOptions } from 'mongoose';
import { CreateProfileDTO, UserCreateDTO } from './dto';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcryptjs';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(User.name)
    private userModelPaginate: PaginateModel<UserDocument>,
  ) {}
  /**
   * Register user
   * @param userCreateDTO
   * @returns
   */
  public async create(userCreateDTO: UserCreateDTO) {
    const userExists = await this.findOne({ email: userCreateDTO.email });
    if (userExists) {
      throw new BadRequestException(
        `Email ${userCreateDTO.email} has been used`,
      );
    }
    const userModel = new this.userModel(userCreateDTO);

    const user = await userModel.save();

    return user;
  }

  /**
   * Get all users
   * @returns
   */
  public async findAll(
    filter: FilterQuery<UserDocument>,
    paginate?: PaginateOptions,
  ) {
    const users = this.userModel.find();

    // await this.userModelPaginate.paginate(filter, {
    //   ...paginate,
    // });
    return users;
  }

  public async findOne(
    filter: FilterQuery<UserDocument>,
  ): Promise<UserDocument | undefined> {
    return await this.userModel.findOne(filter).exec();
  }

  public async login(form: ILoginForm) {
    const user = await this.findByEmail(form.email);
    await this.checkPassword(form.password, user);
    const userPayload = await this.userModel.findOne({ _id: user._id }).exec();

    console.log('====================================');
    console.log('user', userPayload);
    console.log('====================================');
    return userPayload;
  }

  public async delete(id) {
    const user = await this.findOne({ _id: id });
    if (user) {
      return await user.delete();
    }
    throw new NotFoundException(`User with id ${id} not found`);
  }

  private async checkPassword(
    attemptPass: string,
    user: User,
  ): Promise<boolean> {
    console.log('check pass', user);

    const match = await bcrypt.compare(attemptPass, user.password);
    if (!match) {
      throw new BadRequestException('Wrong email or password.');
    }
    return match as boolean;
  }

  private async findByEmail(email: string): Promise<UserDocument> {
    console.log(email);

    const user = await this.userModel.findOne({ email }, '+password email id');
    if (!user) {
      throw new NotFoundException('Email not found.');
    }
    return user;
  }

  async updateProfile(
    createProfileDto: CreateProfileDTO,
    avatar?: Express.Multer.File,
  ) {
    const { user_id, ...profile } = createProfileDto;
    const user = await this.userModel.findOneAndUpdate(
      { _id: user_id },
      {
        profile,
      },
    );
    return user;
  }
}
