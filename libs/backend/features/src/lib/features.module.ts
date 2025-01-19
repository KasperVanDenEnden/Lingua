import { Module } from '@nestjs/common';
import { LocationController } from './location/location.controller';

@Module({
  controllers: [LocationController],
  providers: [],
  exports: [],
})
export class FeaturesModule {}
