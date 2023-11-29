import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant) private readonly tenantRepository: Repository<Tenant>
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    const tenant: Tenant = new Tenant();
    tenant.id = uuidv4();
    tenant.name_store = createTenantDto.name_store;
    tenant.status = createTenantDto.status;
  
    return await this.tenantRepository.save(tenant);
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }

  async findOne(id: string): Promise<Tenant> {
    const admin = await this.tenantRepository.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }

    return admin;
  }

  async remove(id: string): Promise<{ affected?: number }> {
    const result = await this.tenantRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    return result;
  }
}
