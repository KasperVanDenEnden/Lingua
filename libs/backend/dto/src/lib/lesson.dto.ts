import { ICreateLesson, Id, IsObjectId } from '@lingua/api';
import { ArrayMinSize, IsArray, IsDate, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateLessonDto implements ICreateLesson {
  @IsNotEmpty()
  @IsObjectId()
  class!: Id;

  @IsNotEmpty()
  @IsObjectId()
  room!: Id;

  @IsNotEmpty()
  @IsObjectId()
  teacher!: Id;

  @IsArray()
  @ArrayMinSize(0, { message: 'Students must be an array (can be empty)' })
  @IsObjectId({ each: true, message: 'Each student must be a valid ObjectId' })
  students!: Id[];

  @IsNotEmpty()
  @IsDate()
  startTime!: Date;

  @IsNotEmpty()
  @IsDate()
  endTime!: Date;
}
