import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { Types } from "mongoose";

export type Id = Types.ObjectId;

export function IsObjectId(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
      registerDecorator({
        name: 'isObjectId',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            return Types.ObjectId.isValid(value); // Controleert of het een geldig ObjectId is
          },
          defaultMessage(args: ValidationArguments) {
            return `${args.property} must be a valid ObjectId`;
          },
        },
      });
    };
  }