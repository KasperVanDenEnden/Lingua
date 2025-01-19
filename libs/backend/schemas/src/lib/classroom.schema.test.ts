import { MongoMemoryServer } from 'mongodb-memory-server';
import { Classroom, ClassroomSchema } from './classroom.schema';
import { disconnect, Model, Types } from 'mongoose';
import { Test } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { validate } from 'class-validator';

describe('ClassroomSchema Tests', () => {
    let mongod: MongoMemoryServer;
    let classroomModel: Model<Classroom>;
    let baseBody: Partial<Classroom>;

    beforeAll(async () => {
            const app = await Test.createTestingModule({
                imports: [
                    MongooseModule.forRootAsync({
                        useFactory: async () => {
                            mongod = await MongoMemoryServer.create();
                            const uri = mongod.getUri();
                            return { uri };
                        }
                    }),
                    MongooseModule.forFeature([
                        {
                            name: Classroom.name, schema: ClassroomSchema
                        }
                    ])
                ]
            }).compile();
    
            classroomModel = app.get<Model<Classroom>>(getModelToken(Classroom.name));
            await classroomModel.ensureIndexes();
        })
    
        beforeEach(() => {
            baseBody = {
                _id: new Types.ObjectId(),
                location: new Types.ObjectId(),
                slug: 'Slug',
                capacity: 0,
                floor: 0,
                hasMonitor: true
            };
        });
    
        afterAll(async () => {
            await disconnect();
            await mongod.stop();
        })
})