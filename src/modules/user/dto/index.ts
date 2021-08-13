import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
// import { EUserPlatform } from 'src/types/User';
export class UserCreateDTO {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password min 6 character' })
  password: string;

  avatar?: string;
  fbProfileId?: string;
  googleUserId?: string;
  emailVerified?: boolean;

  profile?: {
    fullName?: string;
    avatar?: string;
    dob?: Date;
    phone?: string;
  };
}

export class CreateProfileDTO {
  user_id: string;
  fullName?: string;
  avatar?: string;
  dob?: Date;
  phone?: string;
}
