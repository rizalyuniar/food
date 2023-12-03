import { Module } from '@nestjs/common';
import { TFileService } from './t_file.service';
import { TFileController } from './t_file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TFile } from './entities/t_file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TFile])],
  controllers: [TFileController],
  providers: [TFileService],
})
export class TFileModule {}
