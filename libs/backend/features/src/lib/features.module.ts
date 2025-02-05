import { Module } from '@nestjs/common';
import { LocationController } from './location/location.controller';
import { LocationService } from './location/location.service';
import { UserController } from './user/user.controller';
import { ClassController } from './class/class.controller';
import {
  Class,
  ClassSchema,
  Lesson,
  LessonSchema,
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
import { LessonController } from './lesson/lesson.controller';
import { LessonService } from './lesson/lesson.service';
import { ClassService } from './class/class.service';
import { AssistantController } from './class/assistant/assistant.controller';
import { AssistantService } from './class/assistant/assistant.service';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
      { name: Class.name, schema: ClassSchema },
      { name: User.name, schema: UserSchema },
      { name: Room.name, schema: RoomSchema },
<<<<<<< HEAD
      { name: Lesson.name, schema: LessonSchema }
=======
      { name: Lesson.name, schema: LessonSchema },
>>>>>>> c5510c30f42e50955395669c19f088359d33857f
    ]),
  ],
  controllers: [
    LocationController,
    UserController,
    ClassController,
    RoomController,
    LessonController,
    AssistantController,
    CommentController,
  ],
  providers: [
    LocationService,
    UserService,
    RoomService,
    LessonService,
    ClassService,
    AssistantService,
    CommentService,
  ],
  exports: [],
})
export class FeaturesModule {}
