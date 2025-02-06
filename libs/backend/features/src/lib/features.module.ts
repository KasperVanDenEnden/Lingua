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
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { environment } from '@lingua/util-env';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/role-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
      { name: Class.name, schema: ClassSchema },
      { name: User.name, schema: UserSchema },
      { name: Room.name, schema: RoomSchema },
      { name: Lesson.name, schema: LessonSchema },
    ]),
    JwtModule.register({
      secret: environment.SECRET_KEY,
      signOptions: { expiresIn: '5h'}
    }),
  ],
  controllers: [
    LocationController,
    UserController,
    ClassController,
    RoomController,
    LessonController,
    AssistantController,
    CommentController,
    AuthController,
  ],
  providers: [
    LocationService,
    UserService,
    RoomService,
    LessonService,
    ClassService,
    AssistantService,
    CommentService,
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
  ],
  exports: [AuthService],
})
export class FeaturesModule {}
