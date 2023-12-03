import { Test, TestingModule } from '@nestjs/testing';
import { TFileController } from './t_file.controller';
import { TFileService } from './t_file.service';

describe('TFileController', () => {
  let controller: TFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TFileController],
      providers: [TFileService],
    }).compile();

    controller = module.get<TFileController>(TFileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
