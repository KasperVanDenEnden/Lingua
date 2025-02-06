import { Test, TestingModule } from '@nestjs/testing';
import { ClassRegistrationController } from './class-registration.controller';

describe('ClassRegistrationController', () => {
  let controller: ClassRegistrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassRegistrationController],
    }).compile();

    controller = module.get<ClassRegistrationController>(
      ClassRegistrationController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
