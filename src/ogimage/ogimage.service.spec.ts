import { Test, TestingModule } from '@nestjs/testing';
import { OgimageService } from './ogimage.service';

describe('OgimageService', () => {
  let service: OgimageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OgimageService],
    }).compile();

    service = module.get<OgimageService>(OgimageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
