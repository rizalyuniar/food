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

@Module({
  imports: [

    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService
    }),
    AdminModule,
    UsersModule,
    AuthModule,
    TenantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



    
// ConfigModule.forRoot({
//   envFilePath: '.env',
//   validationSchema: Joi.object({
//     DB_HOST: Joi.string().required(),
//     DB_PORT: Joi.number().required(),
//     DB_USERNAME: Joi.string().required(),
//     DB_PASSWORD: Joi.string().required(),
//     DB_NAME: Joi.string().required(),
//     PORT: Joi.number(),
//   }),
// }),


    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mysql',
    //     host: configService.get('DB_HOST'),
    //     port: +configService.get('DB_PORT'),
    //     username: configService.get('DB_USERNAME'),
    //     password: configService.get('DB_PASSWORD'),
    //     database: configService.get('DB_NAME'),
    //     entities: [],
    //     synchronize: true,
    //     logging: true,
    //   }),