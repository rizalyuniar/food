import { Test, TestingModule } from '@nestjs/testing';
import { MenuGroupController } from './menu_group.controller';
import { MenuGroupService } from './menu_group.service';

describe('MenuGroupController', () => {
  let controller: MenuGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuGroupController],
      providers: [MenuGroupService],
    }).compile();

    controller = module.get<MenuGroupController>(MenuGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
