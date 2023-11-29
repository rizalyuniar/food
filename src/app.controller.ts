import { Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { response } from 'express';


let heroes = [
  {
    id: 1,
    nama: 'rani',
    jk: 'perempuan'
  },
  {
    id: 2,
    nama: 'rizki',
    jk: 'laki-laki'
  }
]

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('tes')
  storeGet(): string {
    return 'test';
  }

  @Post('store')
  // @HttpCode(200)
  store(@Req() request, @Res({ passthrough: true}) response){
    try {
      const {id, nama, type, gambar} = request.body;
    let datas = [];

    datas.push({
      id, nama, type, gambar
    })
    
    response.status(200).send({
      data: datas
    })
  
    return datas
    } catch (error) { 
      
    }
  }
}
