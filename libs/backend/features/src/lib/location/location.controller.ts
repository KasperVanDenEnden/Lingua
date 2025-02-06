import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Put,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LocationService } from './location.service';
import {
  BodyObjectIdsPipe,
  Id,
  ILocation,
  IUpdateLocation,
  Role,
  stringObjectIdPipe,
} from '@lingua/api';
import { Roles } from '../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role-auth.guard';

@Controller('location')
@UseGuards(JwtAuthGuard)
export class LocationController {
  private TAG = 'LocationController';
  constructor(private locationService: LocationService) {}

  @Get()
  async getAll(): Promise<ILocation[]> {
    return await this.locationService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', stringObjectIdPipe) id: Id): Promise<ILocation> {
    Logger.log('getAll', this.TAG);
    return await this.locationService.getOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Body(BodyObjectIdsPipe) body: ILocation): Promise<ILocation> {
    Logger.log('create', this.TAG);
    return await this.locationService.create(body);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Param('id', stringObjectIdPipe) id: Id,
    @Body(BodyObjectIdsPipe) body: IUpdateLocation
  ): Promise<ILocation> {
    Logger.log('update', this.TAG);
    return await this.locationService.update(id, body);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id', stringObjectIdPipe) id: Id) {
    Logger.log('delete', this.TAG);
    return this.locationService.delete(id);
  }
}
