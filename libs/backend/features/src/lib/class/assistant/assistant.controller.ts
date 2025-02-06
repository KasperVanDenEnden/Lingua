import { IClass, Id, Role, stringObjectIdPipe } from '@lingua/api';
import { Controller, Delete, Get, Logger, Param, Put, UseGuards } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../auth/decorators/role.decorator';

@Controller('assistant')
@UseGuards(JwtAuthGuard, AuthGuard)
@Roles(Role.Admin, Role.Teacher)
export class AssistantController {
    private Tag = 'AssistantController';
    constructor(private assistantService:AssistantService) {}

    @Get()
    async getAssistants() {
        Logger.log('get Assistants', this.Tag);
        return await this.assistantService.getAssistants();
    }

    @Put(':id/class/:classId')
    async addAssistant(@Param('id', stringObjectIdPipe) id: Id, @Param('classId', stringObjectIdPipe) classId: Id): Promise<IClass>  {
        Logger.log('addAssistant', this.Tag);
        return await this.assistantService.addAssistant(id, classId)
    }

    @Delete(':id/class/:classId')
    async removeAssistant(@Param('id', stringObjectIdPipe) id: Id, @Param('classId', stringObjectIdPipe) classId: Id): Promise<IClass>  {
        Logger.log('addAssistant', this.Tag);
        return await this.assistantService.removeAssistant(id, classId)
    }
}
