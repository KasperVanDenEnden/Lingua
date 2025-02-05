import { Id, ILocation, IUpdateLocation } from '@lingua/api';
import { Location, LocationDocument } from '@lingua/schemas';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LocationService {
  private TAG = 'LocationService';

  constructor(
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>
  ) {}

  async getAll(): Promise<ILocation[]> {
    Logger.log('getAll', this.TAG);
    return await this.locationModel.find();
  }

  async getOne(id: Id): Promise<ILocation> {
    Logger.log('getOne', this.TAG);
    const location = await this.locationModel.findById(id).exec();

    if (!location)
      throw new HttpException('Location not found', HttpStatus.NOT_FOUND);

    return location;
  }

  async getMany(idArray: Id[]): Promise<ILocation[]> {
    Logger.log('getMany', this.TAG);

    const locations = await this.locationModel
      .find({
        _id: { in: idArray },
      })
      .exec();

    return locations;
  }

  async update(id: Id, changes: IUpdateLocation): Promise<ILocation> {
    Logger.log('update', this.TAG);

    const updatedLocation = await this.locationModel.findByIdAndUpdate(
      { _id: id },
      changes,
      { new: true }
    );
    
    if (!updatedLocation) 
      throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
    
    return updatedLocation;
  }

  async delete(id: Id) {
    Logger.log('delete', this.TAG);

    const deletedLocation = await this.locationModel.findByIdAndDelete({_id:id});

    if (!deletedLocation) 
      throw new HttpException('Location not found', HttpStatus.NOT_FOUND);

    return deletedLocation;
  }
}
