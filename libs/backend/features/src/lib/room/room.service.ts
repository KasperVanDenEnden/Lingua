import { Id, IUpdateRoom, IRoom } from '@lingua/api';
import { Room, RoomDocument } from '@lingua/schemas';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RoomService {
  private TAG = 'RoomService';
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  async getAll(): Promise<IRoom[]> {
    Logger.log('getAll', this.TAG);
    return await this.roomModel.find().populate('location').exec();
  }

  async getOne(id: Id): Promise<IRoom> {
    Logger.log('getOne', this.TAG);

    const user = await this.roomModel.findById(id).populate('location').exec();

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async create(body: IRoom): Promise<IRoom> {
    Logger.log('create', this.TAG);
    return await this.roomModel.create(body);
  }

  async update(id: Id, changes: IUpdateRoom): Promise<IRoom> {
    Logger.log('update', this.TAG);

    const updatedRoom = await this.roomModel.findByIdAndUpdate(
      id,
      changes,
      { new: true }
    );

    if (!updatedRoom)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return updatedRoom;
  }

  async delete(id: Id) {
    Logger.log('delete', this.TAG);

    const deletedRoom = await this.roomModel.findByIdAndDelete(id);

    if (!deletedRoom)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return deletedRoom;
  }
}
