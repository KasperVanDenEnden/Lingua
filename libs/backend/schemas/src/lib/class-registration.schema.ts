import { IClassRegistration, IsObjectId } from '@lingua/api';
import { Types } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsDate, IsEmpty } from 'class-validator';

export type ClassRegistrationDocument = ClassRegistration & Document;

@Schema()
export class ClassRegistration implements IClassRegistration {
  @Prop()
  @IsNotEmpty()
  @IsObjectId()
  id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Class' })
  @IsNotEmpty()
  @IsObjectId()
  class!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  @IsNotEmpty()
  @IsObjectId()
  student!: Types.ObjectId;

  @Prop({ default: Date.now() })
  @IsNotEmpty()
  @IsDate()
  registeredAt!: Date;

  @Prop()
  @IsDate()
  unregisteredAt!: Date;
}

export const ClassRegistrationSchema = SchemaFactory.createForClass(ClassRegistration);
