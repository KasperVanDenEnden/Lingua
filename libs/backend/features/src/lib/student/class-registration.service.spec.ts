import { Test, TestingModule } from '@nestjs/testing';
import { ClassRegistrationService } from './class-registration.service';

describe('ClassRegistrationService', () => {
  let service: ClassRegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassRegistrationService],
    }).compile();

    service = module.get<ClassRegistrationService>(ClassRegistrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
