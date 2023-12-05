import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { MenuGroupService } from './menu_group.service';
import { CreateMenuGroupDto } from './dto/create-menu_group.dto';
import { UpdateMenuGroupDto } from './dto/update-menu_group.dto';
import { Roles } from 'src/auth/role.decorator';
import { request } from 'http';

@Controller('menu-group')
export class MenuGroupController {
  constructor(private readonly menuGroupService: MenuGroupService) {}

  @Post()
  @Roles('admin','kasir')
  async create(@Body() createMenuGroupDto: CreateMenuGroupDto, @Request() request) {
    const payload = request['admin'];
    return await this.menuGroupService.create(createMenuGroupDto, payload);
  }

  @Get()
  findAll() {
    return this.menuGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuGroupService.findOne(id);
  }

  @Patch(':id')
  @Roles('kasir','admin')
  update(@Param('id') id: string, @Body() UpdateMenuGroupDto: UpdateMenuGroupDto, @Request() request) {
    const payload = request['admin'];
    return this.menuGroupService.update(id, UpdateMenuGroupDto, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuGroupService.remove(+id);
  }
}
