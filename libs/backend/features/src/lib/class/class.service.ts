import { IClass, Id, IUpdateClass } from '@lingua/api';
import { Class, ClassDocument } from '@lingua/schemas';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class ClassService {
  private TAG = 'ClassService';
  constructor(
    @InjectModel(Class.name) private classModel: Model<ClassDocument>
  ) {}

  async getAll(): Promise<IClass[]> {
    Logger.log('getAll', this.TAG);
    return await this.classModel.find();
  }

  async getOne(id: Id): Promise<IClass> {
    Logger.log('getOne', this.TAG);

    const instance = await this.classModel.findById(id).populate(['teacher', 'assistants']).exec();

    if (!instance)
      throw new HttpException('Class not found', HttpStatus.NOT_FOUND);

    return instance;
  }

  async create(body: IClass): Promise<IClass> {
    Logger.log('create', this.TAG);
    return await this.classModel.create(body);
  }

  async update(id: Id, body: IUpdateClass): Promise<IClass> {
    Logger.log('update', this.TAG);

    const updatedClass = await this.classModel.findByIdAndUpdate(
      { _id: id },
      body,
      { new: true }
    );

    if (!updatedClass)
      throw new HttpException('Class not found', HttpStatus.NOT_FOUND);

    return updatedClass;
  }

  async delete(id: Id) {
    Logger.log('delete', this.TAG);

    const deletedClass = await this.classModel.findByIdAndDelete(id);

    if (!deletedClass)
      throw new HttpException('Class not found', HttpStatus.NOT_FOUND);

    return deletedClass;
  }
}
