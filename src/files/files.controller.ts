import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Request, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/role.decorator';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @Roles('admin')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() request) {
    console.log('file', file);

    const payload = request['admin'];
    const { filename } = file;
    const { mimetype } = file;
    const created_by = payload.email;
    const savedFile = await this.filesService.saveFile(filename,mimetype,created_by);
    // console.log('File saved:', savedFile);
    
    return { message: 'File uploaded successfully', file: savedFile };
  }
  
  

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }

  @Get(':id/download')
  async downloadFile(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const fileData = await this.filesService.getFileById(id);
      console.log(fileData);
      

      if (fileData) {
        console.log("fetch document : " + fileData.mimetype);
        res.setHeader('Content-Type', fileData.mimetype);

        const fileStream = fs.createReadStream(`${fileData.basepath}/${fileData.filename}`);
        fileStream.pipe(res);
      } else {
        throw new NotFoundException("File tidak ditemukan");
      }
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          message: error.message,
          result: null,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "Gagal",
          result: null,
        });
      }
    }
  }
}

