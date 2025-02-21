import { Id, ILesson } from '@lingua/api';
import { Lesson, LessonDocument } from '@lingua/schemas';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LessonAttendanceService {
  private TAG = 'LessonAttendanceService';

  constructor(
    @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>
  ) {}

  async subscribe(id: Id, studentId: Id): Promise<ILesson> {
    Logger.log('subscribe', this.TAG);

    const existingSubscription = await this.lessonModel.findOne({
      _id: id,
      students: studentId,
    });

    if (existingSubscription)
      throw new HttpException(
        'Student already subscribed!',
        HttpStatus.BAD_REQUEST
      );

    const updatedLesson = await this.lessonModel
      .findByIdAndUpdate(
        id,
        {
          $push: {
            students: studentId,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      )
      .populate('students');

    if (!updatedLesson)
      throw new HttpException('Lesson not found', HttpStatus.NOT_FOUND);

    return updatedLesson;
  }

  async unsubscribe(id: Id, studentId: Id): Promise<ILesson> {
    Logger.log('unsubscribe', this.TAG);

    const existingLesson = await this.lessonModel.findOne({
      _id: id,
      students: studentId,
    });

    if (!existingLesson)
      throw new HttpException(
        'Student not found as subscriber',
        HttpStatus.NOT_FOUND
      );

    const updatedLesson = await this.lessonModel.findByIdAndUpdate(
      id,
      {
        $pull: {
          students: studentId,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedLesson)
      throw new HttpException('Lesson not found', HttpStatus.NOT_FOUND);

    return updatedLesson;
  }
}
