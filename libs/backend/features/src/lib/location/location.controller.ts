import { Controller, Get } from '@nestjs/common';
import { LocationService } from './location.service';
import { ILocation } from '@lingua/api'

@Controller('location')
export class LocationController {
    private TAG = 'LocationController';
    constructor(private locationService:LocationService){}

    @Get()
    async getAll(): Promise<ILocation[]> { return await this.locationService.getAll()}
}
