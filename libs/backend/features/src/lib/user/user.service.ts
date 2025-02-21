import { Id, IUpdateUser, IUser } from '@lingua/api';
import { User, UserDocument } from '@lingua/schemas';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private TAG = 'UserService';
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(): Promise<IUser[]> {
    Logger.log('getAll', this.TAG);
    return await this.userModel.find();
  }

  async getOne(id: Id): Promise<IUser> {
    Logger.log('getOne', this.TAG);

    const user = await this.userModel.findById(id).exec();

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async create(body: IUser): Promise<IUser> {
    Logger.log('create', this.TAG);

    const user = await this.userModel.findOne({ email: body.email });
    if (user) throw new HttpException('Email is not unique', HttpStatus.FOUND);

    body.password = await bcrypt.hashSync(body.password, 10);

    return await this.userModel.create(body);
  }

  async update(id: Id, changes: IUpdateUser): Promise<IUser> {
    Logger.log('update', this.TAG);

    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      changes,
      { new: true }
    );

    if (!updatedUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return updatedUser;
  }

  async delete(id: Id) {
    Logger.log('delete', this.TAG);

    const deletedUser = await this.userModel.findByIdAndDelete(id);

    if (!deletedUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return deletedUser;
  }
}
