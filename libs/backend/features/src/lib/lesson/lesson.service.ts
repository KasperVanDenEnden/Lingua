import { Id, ILesson, IUpdateLesson } from '@lingua/api';
import { Lesson, LessonDocument } from '@lingua/schemas';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LessonService {
  private TAG = 'LessonService';
  constructor(
    @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>
  ) {}

  async getAll(): Promise<ILesson[]> {
    Logger.log('getAll', this.TAG);
    return await this.lessonModel.find()
      .populate({path: 'room',
        populate: { 
          path: 'location'
        }
      })
      .populate('teacher')
      .populate('class')
      .populate('students')
      .exec();
  }

  async getOne(id: Id): Promise<ILesson> {
    Logger.log('getOne', this.TAG);

    const lesson = await this.lessonModel.findById(id)
      .populate({path: 'room',
        populate: { 
          path: 'location'
        }
      })
      .populate('teacher')
      .populate('class')
      .populate('students')
      .exec();

    if (!lesson)
      throw new HttpException('Lesson not found', HttpStatus.NOT_FOUND);

    return lesson;
  }

  async create(body: ILesson): Promise<ILesson> {
    Logger.log('create', this.TAG);
    return await this.lessonModel.create(body);
  }

  async update(id: Id, changes: IUpdateLesson): Promise<ILesson> {
    Logger.log('update', this.TAG);

    const updatedLesson = await this.lessonModel.findByIdAndUpdate(
      id,
      changes,
      { new: true }
    );

    if (!updatedLesson)
      throw new HttpException('Lesson not found', HttpStatus.NOT_FOUND);

    return updatedLesson;
  }

  async delete(id: Id) {
    Logger.log('delete', this.TAG);

    const deletedLesson = await this.lessonModel.findByIdAndDelete(id);

    if (!deletedLesson)
      throw new HttpException('Lesson not found', HttpStatus.NOT_FOUND);

    return deletedLesson;
  }
}
