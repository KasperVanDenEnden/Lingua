import { ILesson, IsObjectId } from "@lingua/api";
import { Types } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { IsString, IsNotEmpty, IsDate } from "class-validator";

export type LessonDocument = Lesson & Document;

@Schema()
export class Lesson implements ILesson {
  @Prop()
  @IsObjectId()
  @IsNotEmpty()
  id!: Types.ObjectId;

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