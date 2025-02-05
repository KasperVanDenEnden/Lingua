import { Body, Controller, Delete, Get, Logger, Param, Put, Post } from '@nestjs/common';
import { LocationService } from './location.service';
import { BodyObjectIdsPipe, Id, ILocation, IUpdateLocation, stringObjectIdPipe } from '@lingua/api'

@Controller('location')
export class LocationController {
    private TAG = 'LocationController';
    constructor(private locationService:LocationService){}

    @Get()
    async getAll(): Promise<ILocation[]> { return await this.locationService.getAll()}

    @Get(':id')
    async getOne(@Param('id', stringObjectIdPipe) id:Id): Promise<ILocation> {
        Logger.log('getAll', this.TAG);
        return await this.locationService.getOne(id);
    }

    @Post()
    async create(@Body(BodyObjectIdsPipe) body: ILocation): Promise<ILocation> {
        Logger.log('create', this.TAG);
        return await this.locationService.create(body)
    }
    
    @Put(':id')
    async update(@Param('id', stringObjectIdPipe) id:Id, @Body(BodyObjectIdsPipe) body: IUpdateLocation): Promise<ILocation> {
        Logger.log('update', this.TAG);
        return await this.locationService.update(id, body)
    }
    
    @Delete(':id')
    async delete(@Param('id', stringObjectIdPipe) id:Id) {
        Logger.log('delete', this.TAG);
        return this.locationService.delete(id);
    }
}
