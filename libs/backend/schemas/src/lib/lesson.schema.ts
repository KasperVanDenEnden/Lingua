import { ILesson, IsObjectId } from '@lingua/api';
import { Types } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

export type LessonDocument = Lesson & Document;

@Schema()
export class Lesson implements ILesson {
  @Prop()
  @IsObjectId()
  @IsNotEmpty()
  _id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Class' })
  @IsNotEmpty()
  @IsObjectId()
  class!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Room' })
  @IsNotEmpty()
  @IsObjectId()
  room!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  @IsNotEmpty()
  @IsObjectId()
  teacher!: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  @IsNotEmpty()
  @IsObjectId({
    each: true,
    message: 'Each user must be a valid ObjectId',
  })
  @IsArray()
  @ArrayMinSize(0, { message: 'Assistants must be an array (can be empty)' })
  students!: Types.ObjectId[];

  @Prop()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  description!: string;

  @Prop()
  @IsNotEmpty()
  @IsDate()
  startTime!: Date;

  @Prop()
  @IsNotEmpty()
  @IsDate()
  endTime!: Date;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
