import { Test, TestingModule } from '@nestjs/testing';
import { TFileService } from './t_file.service';

describe('TFileService', () => {
  let service: TFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TFileService],
    }).compile();

    service = module.get<TFileService>(TFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
