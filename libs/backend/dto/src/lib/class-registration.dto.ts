import { ICreateClassRegistration, Id, IsObjectId } from '@lingua/api';
import { IsNotEmpty } from 'class-validator';

export class CreateClassRegistrationDto implements ICreateClassRegistration {
  @IsNotEmpty()
  @IsObjectId()
  class!: Id;

  @IsNotEmpty()
  @IsObjectId()
  student!: Id;
}
