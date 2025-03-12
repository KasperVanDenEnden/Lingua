import { ICreateLesson, Id, IsObjectId, LessonStatus } from '@lingua/api';
import { Lesson } from '@lingua/schemas';
import { ArrayMinSize, IsArray, IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateLessonDto implements ICreateLesson {
  @IsNotEmpty()
  @IsObjectId()
  course!: Id;

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

  @IsEnum(LessonStatus, { message: 'Status must be a valid enum value'})
  @IsNotEmpty()
  status!: LessonStatus;
  
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsDate()
  day!: Date;

  @IsNotEmpty()
  @IsDate()
  startTime!: Date;

  @IsNotEmpty()
  @IsDate()
  endTime!: Date;
}
