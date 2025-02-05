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
  Room,
  RoomSchema,
  User,
  UserSchema,
} from '@lingua/schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user/user.service';
import { RoomController } from './room/room.controller';
import { RoomService } from './room/room.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
      { name: Class.name, schema: ClassSchema },
      { name: User.name, schema: UserSchema },
      { name: Room.name, schema: RoomSchema }
    ]),
  ],
  controllers: [
    LocationController,
    UserController,
    ClassController,
    RoomController,
  ],
  providers: [LocationService, UserService, RoomService],
  exports: [],
})
export class FeaturesModule {}
