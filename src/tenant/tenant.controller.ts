import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { AuthGuard, Roles } from 'src/auth/auth.guard';
import { InternalServerErrorException } from '@nestjs/common';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}
  @Post()
  @UseGuards(AuthGuard)
  @Roles('admin')
  async create(@Body() createTenantDto: CreateTenantDto) {
    try {
      return await this.tenantService.create(createTenantDto);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Terjadi kesalahan saat membuat tenant');
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.tenantService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantService.findOne(id);
  }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
  //   return this.tenantService.update(+id, updateTenantDto);
  // }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenantService.remove(id);
  }
}
