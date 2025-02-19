import { IReview, IsObjectId } from '@lingua/api';
import { Types } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsNotEmpty, IsDate, IsInt } from 'class-validator';

export type ReviewDocument = Review & Document;

@Schema()
export class Review implements IReview {
  @Prop()
  @IsNotEmpty()
  @IsObjectId()
  _id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  @IsNotEmpty()
  @IsObjectId()
  student!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Class' })
  @IsNotEmpty()
  @IsObjectId()
  class!: Types.ObjectId;

  @Prop()
  @IsNotEmpty()
  @IsString()
  comment!: string;

  @Prop()
  @IsNotEmpty()
  @IsInt()
  rating!: number;

  @Prop({ default: Date.now() })
  @IsNotEmpty()
  @IsDate()
  createdAt!: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
