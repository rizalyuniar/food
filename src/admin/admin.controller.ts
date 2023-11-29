import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { v4 as uuidv4 } from 'uuid';

// let newId = uuidv4()

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adminService.findOne(id);
  // }
  @Get(':id')
  findOne(@Param('email') email: string) {
    // Now you can use both 'id' and 'email' parameters in your method
    return this.adminService.findOne(email);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
  //   return this.adminService.update(id, updateAdminDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }

  // @Patch('/ganti-pasword')
  // updatePassword(@Param('email') email: string, @Body() updatedminDto: UpdateAdminDto ){
  //   return this.adminService.update(email, updatedminDto);
  // }

  // @Get('/login/:id')
  // loginId(@Param('id') id: string) {
  //   return this.adminService.findOne(id);
  // }
}
