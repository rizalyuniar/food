import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { DatabaseConnectionService } from './services/database-connection.service';
import { AuthModule } from './auth/auth.module';
import { TenantModule } from './tenant/tenant.module';
import { MulterModule } from '@nestjs/platform-express';
import { TFileModule } from './t_file/t_file.module';
import { FilesModule } from './files/files.module';
import { FilesService } from './files/files.service';
import { UploadModule } from './upload/upload.module';
import { BannerModule } from './banner/banner.module';
import { MenuGroupModule } from './menu_group/menu_group.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService
    }),
    // MulterModule.register({ dest: './uploads' }),
    AdminModule,
    UsersModule,
    AuthModule,
    TenantModule,
    TFileModule,
    FilesModule,
    UploadModule,
    BannerModule,
    MenuGroupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}