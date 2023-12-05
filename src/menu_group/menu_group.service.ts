import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuGroupDto } from './dto/create-menu_group.dto';
import { UpdateMenuGroupDto } from './dto/update-menu_group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuGroup } from './entities/menu_group.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AdminPayload } from 'src/admin/admin.interface';

@Injectable()
export class MenuGroupService {
  constructor(
    @InjectRepository(MenuGroup) private readonly menugroupRepository: Repository<MenuGroup>
  ) {}

  async create(createMenuGroupDto: CreateMenuGroupDto, payload: AdminPayload): Promise<MenuGroup> {
    const menuGroup: MenuGroup = new MenuGroup();
    menuGroup.id = uuidv4();
    menuGroup.name = createMenuGroupDto.name;
    menuGroup.description = createMenuGroupDto.description;
    menuGroup.sequence = createMenuGroupDto.sequence;
    menuGroup.status = createMenuGroupDto.status;
    menuGroup.created_by = payload.email;

    return await this.menugroupRepository.save(menuGroup);
  }

  async findAll(): Promise<MenuGroup[]> {
    return await this.menugroupRepository.find();
  }

  async findOne(id: string): Promise<MenuGroup> {
    const menuGroup = await this.menugroupRepository.findOne({ where: {id} });
    if (!menuGroup) {
      throw new NotFoundException(`menu group with ID ${id} not found`)
    }
    return menuGroup;
  }

  async update(id: string, UpdateMenuGroupDto: UpdateMenuGroupDto, payload: AdminPayload) {
    const menuGroup = await this.menugroupRepository.findOne({ where: {id}});
    menuGroup.name = UpdateMenuGroupDto.name;
    menuGroup.description = UpdateMenuGroupDto.description;
    menuGroup.sequence = UpdateMenuGroupDto.sequence;
    menuGroup.status = UpdateMenuGroupDto.status;
    menuGroup.updated_by = payload.email;

    return this.menugroupRepository.save(menuGroup)
  }

  remove(id: number) {
    return `This action removes a #${id} menuGroup`;
  }
}
