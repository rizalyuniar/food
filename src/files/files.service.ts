import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { v4 as uuidv4 } from 'uuid';
import { appConfig } from 'src/config/app';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File) private readonly filesRepository: Repository<File>,
  ) {}

  async saveFile(filename: string, mimetype: string, created_by: string): Promise<File> {
    const file = this.filesRepository.create({
      id: uuidv4(),
      filename,
      basepath: appConfig.base_path_storage,
      mimetype,
      created_by,
    });
    return await this.filesRepository.save(file);
  }

  async getFileById(id: string): Promise<File> {
    return await this.filesRepository.findOne({where: {id} });
  }
 

  

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
