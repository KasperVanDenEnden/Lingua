import { Module } from '@nestjs/common';
import { LocationController } from './location/location.controller';
import { LocationService } from './location/location.service';
import { UserController } from './user/user.controller';
import { ClassController } from './class/class.controller';
import {
  Class,
  ClassSchema,
  Location,
  LocationSchema,
  User,
  UserSchema,
} from '@lingua/schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
      { name: Class.name, schema: ClassSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [
    LocationController,
    UserController,
    ClassController,
  ],
  providers: [LocationService, UserService],
  exports: [],
})
export class FeaturesModule {}
