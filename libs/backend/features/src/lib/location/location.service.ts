import { ILocation } from '@lingua/api';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location,  } from '@lingua/schemas'
import { LocationDocument } from '@lingua/schemas';


@Injectable()
export class LocationService {
    private TAG = 'LocationService'

    constructor(
        @InjectModel(Location.name) private locationModel: Model<LocationDocument>
    ) {}

    async getAll(): Promise<ILocation[]> {
        Logger.log('getAll', this.TAG)
        return await this.locationModel.find();
    }
}
