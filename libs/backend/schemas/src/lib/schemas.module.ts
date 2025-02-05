import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from './location.schema';
import { User, UserSchema } from './user.schema';
import { Room, RoomSchema } from './room.schema';
import { Lesson, LessonSchema } from './lesson.schema';
import { Class, ClassSchema } from './class.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema},
      { name: User.name, schema: UserSchema},
      { name: Room.name, schema: RoomSchema},
      { name: Lesson.name, schema: LessonSchema},
      { name: Class.name, schema: ClassSchema},
    ])
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class SchemasModule {}
