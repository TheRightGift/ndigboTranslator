import { Module } from '@nestjs/common';
import { OgimageService } from './ogimage.service';
import { OgimageController } from './ogimage.controller';

@Module({
  controllers: [OgimageController],
  providers: [OgimageService]
})
export class OgimageModule {}
