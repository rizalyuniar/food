import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AdminPayload } from 'src/admin/admin.interface';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant) private readonly tenantRepository: Repository<Tenant>
  ) {}

  async create(createTenantDto: CreateTenantDto, payload: AdminPayload): Promise<Tenant> {
    const tenant: Tenant = new Tenant();
    tenant.id = uuidv4();
    tenant.name = createTenantDto.name;
    tenant.initial = createTenantDto.initial;
    tenant.description = createTenantDto.description;
    tenant.profile_pict_file_id = createTenantDto.profile_pict_file_id;
    tenant.type = createTenantDto.type;
    tenant.status = createTenantDto.status;
    tenant.created_by = payload.username;
  
    return await this.tenantRepository.save(tenant);
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }

  async findOne(id: string): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOne({ where: { id } });
    if (!tenant) {
      throw new NotFoundException(`Tenant with id ${id} not found`);
    }
    return tenant;
  }

  async update(id: string, updateTenantDto: UpdateTenantDto, payload: AdminPayload) {
    const tenant = await this.tenantRepository.findOne({ where: {id} })
    tenant.name = updateTenantDto.name;
    tenant.initial = updateTenantDto.initial;
    tenant.description = updateTenantDto.description;
    tenant.profile_pict_file_id = updateTenantDto.profile_pict_file_id;
    tenant.type = updateTenantDto.type;
    tenant.status = updateTenantDto.status;
    tenant.updated_by = payload.username;

    return this.tenantRepository.save(tenant)
  }

  async remove(id: string, payload: AdminPayload) {
    // const result = await this.tenantRepository.delete(id);
    const tenant = await this.tenantRepository.findOne({ where: {id} });

    if (!tenant) {
      throw new NotFoundException(`Tenant with ID ${id} not found`);
    }
    tenant.status = -1;
    tenant.deleted_at = new Date();
    tenant.deleted_by = payload.username;
    return this.tenantRepository.save(tenant);
  }
}
