import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchemasModule} from '@lingua/schemas'
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '@lingua/util-env';
import { FeaturesModule } from '@lingua/features';


@Module({
  imports: [FeaturesModule, SchemasModule, MongooseModule.forRoot(environment.mongoDbUrl)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
