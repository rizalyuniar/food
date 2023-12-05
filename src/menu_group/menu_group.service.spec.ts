import { Test, TestingModule } from '@nestjs/testing';
import { MenuGroupService } from './menu_group.service';

describe('MenuGroupService', () => {
  let service: MenuGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuGroupService],
    }).compile();

    service = module.get<MenuGroupService>(MenuGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
