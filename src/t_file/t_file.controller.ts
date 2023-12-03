import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TFileService } from './t_file.service';
import { CreateTFileDto } from './dto/create-t_file.dto';
import { UpdateTFileDto } from './dto/update-t_file.dto';
import { Roles } from 'src/auth/role.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TFile } from './entities/t_file.entity';
import { v4 as uuidv4 } from 'uuid';

@Controller('t-file')
export class TFileController {
  constructor(private readonly tFileService: TFileService) { }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          const filename = `t_file_${uniqueSuffix}${extension}`;
          req.body.filename = filename;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // Save file information to the database
    const newFile: TFile = {
      id: uuidv4(),
      filename: file.filename,
      basepath: 'uploads/',
      mimetype: file.mimetype,
      version: 1, // berikan nilai yang sesuai untuk properti lainnya
      type: 'example',
      usage_status: 0,
      created_at: new Date(),
      created_by: 'user123', // ganti dengan informasi pengguna yang sebenarnya
      updated_at: new Date(),
      updated_by: null,
      deleted_at: null,
      deleted_by: null,
    };
    const savedFile = await this.tFileService.create(newFile);
    return savedFile;
  }

  @Get()
  findAll() {
    return this.tFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tFileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTFileDto: UpdateTFileDto) {
    return this.tFileService.update(+id, updateTFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tFileService.remove(+id);
  }
}
