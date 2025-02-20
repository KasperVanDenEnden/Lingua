import { ClassStatus, IClass, IsObjectId, IUpsertReview, Language } from '@lingua/api';
import { Types } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsDate,
  ArrayMinSize,
  IsArray,
} from 'class-validator';
import { ReviewSchema } from './review.schema';

export type ClassDocument = Class & Document;

@Schema()
export class Class implements IClass {
  @Prop({ default: () => new Types.ObjectId() })
  @IsNotEmpty()
  @IsObjectId()
  _id!: Types.ObjectId;

  @Prop()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  description!: string;

  @Prop({ type: String, enum: Object.values(ClassStatus) })
  @IsNotEmpty()
  @IsEnum(ClassStatus, { message: 'Status must be a valid enum value' })
  status!: ClassStatus;

  @Prop({ default: Date.now() })
  @IsNotEmpty()
  @IsDate()
  createdOn!: Date;

  @Prop({ type: String, enum: Object.values(Language) })
  @IsNotEmpty()
  @IsEnum(Language, { message: 'Language must be a valid enum value' })
  language!: Language;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  @IsNotEmpty()
  @IsObjectId()
  teacher!: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  @IsNotEmpty()
  @IsObjectId({
    each: true,
    message: 'Each asstisant must be a valid ObjectId',
  })
  @IsArray()
  @ArrayMinSize(0, { message: 'Assistants must be an array (can be empty)' })
  assistants!: Types.ObjectId[];

  @Prop({ type: [ReviewSchema] })
  reviews!: IUpsertReview[];
}

export const ClassSchema = SchemaFactory.createForClass(Class);
