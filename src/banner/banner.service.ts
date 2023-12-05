import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from './entities/banner.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AdminPayload } from 'src/admin/admin.interface';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner) private readonly bannerRepository: Repository<Banner>
  ) {}

  async create(createBannerDto: CreateBannerDto, payload: AdminPayload): Promise<Banner> {
    const banner: Banner = new Banner();
    banner.id = uuidv4();
    banner.picture_file_id = createBannerDto.picture_file_id;
    banner.description = createBannerDto.description;
    banner.sequence = createBannerDto.sequence;
    banner.status = createBannerDto.status
    banner.created_by = payload.username;
    
    console.log(banner);
    return await this.bannerRepository.save(banner);
  }

  async findAll(): Promise<Banner[]> {
    return await this.bannerRepository.find();
  }

  async findOne(id: string): Promise<Banner> {
    const banner = await this.bannerRepository.findOne({ where: {id}});
    if (!banner) {
      throw new NotFoundException(`banner with ID ${id} not found`);
    }
    return banner;
  }

  async update(id: string, updateBannerDto: UpdateBannerDto, payload: AdminPayload) {
    const banner = await this.bannerRepository.findOne({ where: {id} });
    banner.picture_file_id = updateBannerDto.picture_file_id;
    banner.description = updateBannerDto.description;
    banner.sequence = updateBannerDto.sequence;
    banner.status = updateBannerDto.status
    banner.updated_by = payload.username;

    return this.bannerRepository.save(banner)
  }

  remove(id: number) {
    return `This action removes a #${id} banner`;
  }
}
