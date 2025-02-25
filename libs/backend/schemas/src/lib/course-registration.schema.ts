import { ICourseRegistration, IsObjectId } from '@lingua/api';
import { Types } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsDate } from 'class-validator';

export type CourseRegistrationDocument = CourseRegistration & Document;

@Schema()
export class CourseRegistration implements ICourseRegistration {
  @Prop({ default: () => new Types.ObjectId() })
  @IsNotEmpty()
  @IsObjectId()
  _id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course' })
  @IsNotEmpty()
  @IsObjectId()
  course!: Types.ObjectId;

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

export const CourseRegistrationSchema = SchemaFactory.createForClass(CourseRegistration);
