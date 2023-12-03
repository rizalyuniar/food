import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateTFileDto } from './dto/create-t_file.dto';
import { UpdateTFileDto } from './dto/update-t_file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TFile } from './entities/t_file.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { appConfig } from 'src/config/app';
import * as path from 'path';
import { Request } from 'express';

@Injectable()
export class TFileService {
  constructor(
    @InjectRepository(TFile) 
    private readonly tFileRepository: Repository<TFile>,
  ) {}

  async create(file: TFile): Promise<TFile> {
    return await this.tFileRepository.save(file);
  }


  findAll() {
    return `This action returns all tFile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tFile`;
  }

  update(id: number, updateTFileDto: UpdateTFileDto) {
    return `This action updates a #${id} tFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} tFile`;
  }
}
