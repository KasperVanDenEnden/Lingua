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
  _id!: Types.ObjectId;

  @Prop()
  @IsNotEmpty()
  @IsObjectId()
  class!: Types.ObjectId;

  @Prop()
  @IsNotEmpty()
  @IsObjectId()
  classroom!: Types.ObjectId;

  @Prop()
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