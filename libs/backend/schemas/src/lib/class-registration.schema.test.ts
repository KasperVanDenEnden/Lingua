import { MongoMemoryServer } from 'mongodb-memory-server';
import { disconnect, Model, Types } from 'mongoose';
import { Test } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { validate } from 'class-validator';
import { ClassRegistration, ClassRegistrationSchema } from './class-registration.schema';

describe('ClassSchema Tests', () => {
  let mongod: MongoMemoryServer;
  let classRegistrationModel: Model<ClassRegistration>;
  let baseBody: Partial<ClassRegistration>;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            return { uri };
          },
        }),
        MongooseModule.forFeature([
          {
            name: ClassRegistration.name,
            schema: ClassRegistrationSchema,
          },
        ]),
      ],
    }).compile();

    classRegistrationModel = app.get<Model<ClassRegistration>>(getModelToken(ClassRegistration.name));
    await classRegistrationModel.ensureIndexes();
  });

  beforeEach(() => {
    baseBody = {
      _id: new Types.ObjectId(),
      class: new Types.ObjectId(),
      student: new Types.ObjectId(),
      registeredAt: new Date(),
      unregisteredAt: new Date(),
    };
  });

  afterAll(async () => {
    await disconnect();
    await mongod.stop();
  });

  it('should pass validation with valid data', async () => {
    const body = { ...baseBody };

    const plain = plainToInstance(ClassRegistration, body);
    const errors = await validate(plain);
    console.log(errors)

    expect(errors.length).toBe(0);
  });

  it('should fail validation if class is missing', async () => {
    const body = { ...baseBody, class: undefined };

    const plain = plainToInstance(ClassRegistration, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('class');
    expect(errors[0].constraints?.['isNotEmpty']).toBe(
      'class should not be empty'
    );
  });

  it('should fail validation if student is missing', async () => {
    const body = { ...baseBody, student: undefined };

    const plain = plainToInstance(ClassRegistration, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('student');
    expect(errors[0].constraints?.['isNotEmpty']).toBe(
      'student should not be empty'
    );
  });

  it('should fail validation if registeredAt is missing', async () => {
    const body = { ...baseBody, registeredAt: undefined };

    const plain = plainToInstance(ClassRegistration, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('registeredAt');
    expect(errors[0].constraints?.['isNotEmpty']).toBe(
      'registeredAt should not be empty'
    );
  });

  it('should fail validation if class is invalid type', async () => {
    const body = { ...baseBody, class: 'invalid'  };

    const plain = plainToInstance(ClassRegistration, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('class');

    expect(errors[0].constraints?.['isObjectId']).toBe('class must be a valid ObjectId');
  });

  it('should fail validation if student is invalid type', async () => {
    const body = { ...baseBody, student: 'invalid' };

    const plain = plainToInstance(ClassRegistration, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('student');

    expect(errors[0].constraints?.['isObjectId']).toBe(
      'student must be a valid ObjectId'
    );
  });

  it('should fail validation if registeredAt is invalid type', async () => {
    const body = { ...baseBody, registeredAt: 'invalid'  };

    const plain = plainToInstance(ClassRegistration, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('registeredAt');

    expect(errors[0].constraints?.['isDate']).toBe(
      'registeredAt must be a Date instance'
    );
  });

  it('should fail validation if unregisteredAt is invalid type', async () => {
    const body = { ...baseBody, unregisteredAt: 'invalid' };

    const plain = plainToInstance(ClassRegistration, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('unregisteredAt');

    expect(errors[0].constraints?.['isDate']).toBe(
      'unregisteredAt must be a Date instance'
    );
  });
});
