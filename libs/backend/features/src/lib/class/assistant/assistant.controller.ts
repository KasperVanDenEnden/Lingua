import { BodyObjectIdsPipe, IClass, IUpdateClassAssistant, Role } from '@lingua/api';
import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../auth/decorators/role.decorator';
import { RolesGuard } from '../../auth/guards/role-auth.guard';

@Controller('assistant')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin, Role.Teacher)
export class AssistantController {
  private Tag = 'AssistantController';
  constructor(private assistantService: AssistantService) {}

  @Get()
  async getAssistants() {
    Logger.log('get Assistants', this.Tag);
    return await this.assistantService.getAssistants();
  }

  @Post('add')
  async addAssistant(@Body(BodyObjectIdsPipe) body: IUpdateClassAssistant): Promise<IClass> {
    Logger.log('addAssistant', this.Tag);
    return await this.assistantService.addAssistant(body);
  }

  @Post('remove')
  async removeAssistant(@Body(BodyObjectIdsPipe) body: IUpdateClassAssistant): Promise<IClass> {
    Logger.log('removeAssistant', this.Tag);
    return await this.assistantService.removeAssistant(body);
  }
}
