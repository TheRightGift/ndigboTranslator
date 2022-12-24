import { Test, TestingModule } from '@nestjs/testing';
import { OgimageController } from './ogimage.controller';
import { OgimageService } from './ogimage.service';

describe('OgimageController', () => {
  let controller: OgimageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OgimageController],
      providers: [OgimageService],
    }).compile();

    controller = module.get<OgimageController>(OgimageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
