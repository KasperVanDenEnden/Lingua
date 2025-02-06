import { ICreateComment, IsObjectId } from '@lingua/api';
import { IsNotEmpty, IsString, Min, Max, IsInt } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCommentDto implements ICreateComment {
  @IsNotEmpty()
  @IsObjectId()
  student!: Types.ObjectId;

  @IsNotEmpty()
  @IsObjectId()
  class!: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  comment!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(5)
  rating!: number;
}
