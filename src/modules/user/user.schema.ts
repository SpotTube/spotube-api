import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { EUserPlatform } from 'src/types/User';
import { SCHEMA_OPTIONS } from 'src/db/config';

const saltOrRounds = 10;
export type UserDocument = User & mongoose.Document;

class Profile {
  fullName?: string;
  avatar?: string;
  dob?: Date;
  phone?: string;
}

@Schema(SCHEMA_OPTIONS)
export class User {
  @Prop({
    select: false,
    required: true,
  })
  password: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    default: EUserPlatform.LOCAL,
  })
  platform: EUserPlatform;

  @Prop({ type: Profile })
  profile: Profile;

  @Prop()
  fbProfileId: string;

  @Prop()
  googleUserId: string;

  @Prop({ default: false })
  emailVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, saltOrRounds);
  }
  next();
});
