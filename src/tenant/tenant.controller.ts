import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { Roles } from 'src/auth/role.decorator';
import { request } from 'http';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}
  
  @Post()
  @Roles('admin','kasir')
  async create(@Body() createTenantDto: CreateTenantDto, @Request() request) {
    const payload = request['admin'];
    try {
      return await this.tenantService.create(createTenantDto, payload);
    } catch (error) {
      throw new InternalServerErrorException('Terjadi kesalahan saat membuat tenant');
    }
  }

  @Get()
  findAll() {
    return this.tenantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin','kasir')
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto, @Request() request) {
    const payload = request['admin'];
    return this.tenantService.update(id, updateTenantDto, payload);
  }

  @Delete(':id')
  @Roles('admin','kasir')
  remove(@Param('id') id: string, @Request() request) {
    const payload = request['admin'];
    return this.tenantService.remove(id, payload);
  }
}
