import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const saltOrRounds = 10;
    const password = createAdminDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const idTenant =uuidv4();

    const existingAdmin = await this.adminRepository.findOne({ where: [{ email: createAdminDto.email }, { username: createAdminDto.username }] });
    if (existingAdmin) {
      throw new ConflictException('Email atau username sudah digunakan.');
    }

    const admin: Admin = new Admin();
    admin.id = uuidv4();
    admin.email = createAdminDto.email;
    admin.username = createAdminDto.username;
    admin.password = hash;
    admin.full_name = createAdminDto.full_name;
    admin.role = createAdminDto.role;
    admin.profile_pict_file_id = createAdminDto.profile_pict_file_id;
    admin.tenant_id = admin.role === 'tenant' ? idTenant : null;
    admin.status = createAdminDto.status;
    // admin.created_by = createAdminDto.created_by;

    return this.adminRepository.save(admin);
  }

  async findOne(email: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { email } });

    if (!admin) {
      throw new NotFoundException(`Admin with email ${email} not found`);
    }

    return admin;
  }

  async validateAdmin(email: string, password: string) {
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin) {
      throw new NotFoundException(`Admin with email ${email} not found`);
    }

    if (admin.status === -1) {
      throw new NotFoundException('Account is non-active');
  }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    return admin;
  }

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async remove(id: string): Promise<{ affected?: number }> {
    const result = await this.adminRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    return result;
  }

  // async findOne(id: string; email: string ): Promise<Admin> {
  //   const admin = await this.adminRepository.findOne({ where: {id}});

  //   if (!admin) {
  //     throw new NotFoundException(`Admin with ID ${id} not found`);
  //   }

  //   return admin;
  //   // return this.adminRepository.findOneBy({ id });
  // }

  async getByEmail(email: string) {
    const user = await this.adminRepository.findOne({ where: {email} });
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  // const newUser = await this.usersRepository.create(userData);
  //   await this.usersRepository.save(newUser);
  //   return newUser;

  // async update(id: string, updateAdminDto: UpdateAdminDto) {

  //   const admin = await this.findOne(id);
  //   // return `This action updates a #${id} admin`;
  //   // const admin: Admin = new Admin();
  //   admin.username = updateAdminDto.username;
  //   admin.role = updateAdminDto.role;
  //   admin.email = updateAdminDto.email;
  //   admin.password = updateAdminDto.password;
  //   admin.created_by = updateAdminDto.created_by;
    
  //   return this.adminRepository.save(admin)
  // }

  // remove(id: number): Promise<{ affected?: number }> {
  //   // return `This action removes a #${id} admin`;
  //   return this.adminRepository.delete(id)
  // }

  //  ganti password
  // async updatePassword(email: string, newPassword: string, reNewPassword: string, updateAdminDto: UpdateAdminDto) {
  //   try {
  //     const akunAdmin = await this.adminRepository.findOne({ where: {email}});

  //     // akunAdmin.password = updateAdminDto.password;
  //     if(!akunAdmin){
  //       throw new NotFoundException(`Admin with email ${email} not found`);
  //     }

  //     const isPasswordMatching = await bcrypt.compare(
  //       reNewPassword,
  //       newPassword
  //     );

  //     if (!isPasswordMatching) {
  //       throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
  //     }
  //     reNewPassword = updateAdminDto.password;
  //     this.adminRepository.save(akunAdmin)
  //     return akunAdmin;
  //   } catch (error) {
  //     throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
  //   }
  // }
}
