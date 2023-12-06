import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Roles } from 'src/auth/role.decorator';
import { request } from 'http';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  @Roles('admin','kasir')
  async create(@Body() createBannerDto: CreateBannerDto, @Request() request) {
    const payload = request['admin'];
    return await this.bannerService.create(createBannerDto, payload);
  }

  @Get()
  findAll() {
    return this.bannerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannerService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin','kasir')
  update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto, @Request() request) {
    const payload = request['admin'];
    return this.bannerService.update(id, updateBannerDto, payload);
  }

  @Delete(':id')
  @Roles('admin','kasir')
  remove(@Param('id') id: string, @Request() request) {
    const payload = request['admin'];
    return this.bannerService.remove(id, payload);
  }
}
