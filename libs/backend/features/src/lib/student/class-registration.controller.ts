import { Body, Controller, Get, Logger, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role-auth.guard';
import { BodyObjectIdsPipe, IClassRegistration, Id, IUser, Role, stringObjectIdPipe } from '@lingua/api';
import { Roles } from '../auth/decorators/role.decorator';
import { ClassRegistrationService } from './class-registration.service';

@Controller('class-registration')
@UseGuards(JwtAuthGuard)
export class ClassRegistrationController {
    private TAG = 'ClassRegistrationController'

    constructor(private classRegistrationService: ClassRegistrationService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.Teacher, Role.Admin)
    @Get()
    async getRegistrations(): Promise<IClassRegistration[]> {
        Logger.log('getRegistrations', this.TAG);
        return await this.classRegistrationService.getRegistrations()
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Teacher, Role.Admin)
    @Get(':id')
    async getRegisteredStudents(@Param('id', stringObjectIdPipe) id:Id): Promise<IUser[]> {
        Logger.log('getRegisteredStudents', this.TAG);
        return await this.classRegistrationService.getRegisteredStudents(id);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Student, Role.Admin)
    @Post()
    async register(@Body(BodyObjectIdsPipe) body: IClassRegistration): Promise<IClassRegistration> {
        Logger.log('register', this.TAG)
        return await this.classRegistrationService.register(body);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Student, Role.Admin)
    @Put(':id')
    async unregister(@Param('id', stringObjectIdPipe) id:Id): Promise<IClassRegistration> {
        Logger.log('unregister', this.TAG)
        return await this.classRegistrationService.unregister(id);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Get(':id')
    async delete(@Param('id', stringObjectIdPipe) id:Id): Promise<IClassRegistration> {
        Logger.log('delete', this.TAG);
        return await this.classRegistrationService.delete(id);
    }
}
