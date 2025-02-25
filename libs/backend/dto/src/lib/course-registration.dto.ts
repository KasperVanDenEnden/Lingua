import { ICreateCourseRegistration, Id, IsObjectId } from '@lingua/api';
import { IsNotEmpty } from 'class-validator';

export class CreateCourseRegistrationDto implements ICreateCourseRegistration {
  @IsNotEmpty()
  @IsObjectId()
  course!: Id;

  @IsNotEmpty()
  @IsObjectId()
  student!: Id;
}
