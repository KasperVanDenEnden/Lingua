import { IsObjectId, IUser, Role } from '@lingua/api';
import { Types } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsEnum, IsNotEmpty } from 'class-validator';

export type UserDocument = User & Document;

@Schema()
export class User implements IUser {
  @Prop()
  @IsNotEmpty()
  @IsObjectId()
  id!: Types.ObjectId;

  @Prop({ type: String, enum: Object.values(Role) })
  @IsNotEmpty()
  @IsEnum(Role, { message: 'Role must be a valid enum value' })
  role!: Role;

  @Prop()
  @IsNotEmpty()
  @IsString()
  firstname!: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  lastname!: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  email!: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  password!: string;

  token!:string;
}

export const UserSchema = SchemaFactory.createForClass(User);
