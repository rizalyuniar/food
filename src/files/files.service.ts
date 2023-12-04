import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { v4 as uuidv4 } from 'uuid';
import { appConfig } from 'src/config/app';
import { AdminPayload } from 'src/admin/admin.interface';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File) private readonly filesRepository: Repository<File>,
  ) {}

  async saveUploadedFile(file: Express.Multer.File, payload: AdminPayload): Promise<File> {
    const { filename, mimetype } = file;
    const basepath = appConfig.base_path_storage;
    const type = 'foto_makanan';
    const created_by = payload.email;
  
    const fileData = this.filesRepository.create({
      id: uuidv4(),
      filename,
      basepath,
      mimetype,
      type,
      created_by,
    });
  
    return await this.filesRepository.save(fileData);
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
