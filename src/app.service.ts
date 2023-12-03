import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // async uploadFile(file: Express.Multer.File) {
  //   // Proses penyimpanan file di sini, misalnya menyimpan di database atau sistem penyimpanan file lainnya.

  //   return { message: 'File uploaded successfully' };
  // }
}
