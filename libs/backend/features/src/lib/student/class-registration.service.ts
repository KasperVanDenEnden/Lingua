import { IClassRegistration, Id, IUser } from '@lingua/api';
import { ClassRegistration, ClassRegistrationDocument } from '@lingua/schemas';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ClassRegistrationService {
  private TAG = 'ClassRegistrationService';

  constructor(
    @InjectModel(ClassRegistration.name)
    private classRegistrationModel: Model<ClassRegistrationDocument>
  ) {}

  async getRegistrations(): Promise<IClassRegistration[]> {
    Logger.log('getRegistrations', this.TAG);

    const registrations = await this.classRegistrationModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'student',
          foreignField: '_id',
          as: 'studentDetails',
        },
      },
      {
        $lookup: {
          from: 'classes',
          localField: 'class',
          foreignField: '_id',
          as: 'classDetails',
        },
      },
      {
        $unwind: { path: '$studentDetails', preserveNullAndEmptyArrays: true }, // Dit haalt het student detail uit het array
      },
      {
        $unwind: { path: '$classDetails', preserveNullAndEmptyArrays: true }, // Dit haalt het class detail uit het array
      },
    ]);

    return registrations;
  }

  async getRegisteredStudents(classId: Id): Promise<IUser[]> {
    Logger.log(`Fetching registered students for class ${classId}`, this.TAG);

    const registrations = await this.classRegistrationModel
      .find({
        class: classId,
        unregisteredAt: { $exists: false },
      })
      .populate('student')
      .lean();

    return registrations.map((reg: any) => reg.student);
  }

  async register(body: IClassRegistration): Promise<IClassRegistration> {
    Logger.log('register', this.TAG);

    const existingRecord = await this.classRegistrationModel.findOne({
      class: body.class,
      student: body.student,
      unregisteredAt: { $exists: false },
    });

    if (existingRecord)
      throw new HttpException(
        'Student already registered',
        HttpStatus.BAD_REQUEST
      );

    return await this.classRegistrationModel.create(body);
  }

  async unregister(id: Id): Promise<IClassRegistration> {
    Logger.log('unregister', this.TAG);

    const updatedClassRegistration =
      await this.classRegistrationModel.findByIdAndUpdate(
        id,
        { unregisteredAt: Date.now() },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedClassRegistration)
      throw new HttpException(
        'Class registration not found',
        HttpStatus.NOT_FOUND
      );

    return updatedClassRegistration;
  }

  async delete(id: Id): Promise<IClassRegistration> {
    Logger.log('delete', this.TAG);

    const deletedRegistration =
      await this.classRegistrationModel.findByIdAndDelete({ id });

    if (!deletedRegistration)
      throw new HttpException(
        'Class registration not found',
        HttpStatus.NOT_FOUND
      );

    return deletedRegistration;
  }
}
