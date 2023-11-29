import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // akan secara otomatis memvalidasi data masuk menggunakan aturan validasi DTO untuk semua rute
  // app.useGlobalPipes(new ValidationPipe());

  // untnuk swagger
  const options = new DocumentBuilder()
    .setTitle('latihan Crud')
    .setDescription('The API description')
    .setVersion('1.0')
    // .addTag('todo')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
  
  app.useGlobalPipes(
    new ValidationPipe({
      // agar properti yg tidak sesuai dengan dto akan secara otomais diabaikan
      whitelist: true,

      //  untuk memberikan informasi kesalahan dari user yang input
      forbidNonWhitelisted: true,
      // disableErrorMessages: true,
      
    }),
  );
  await app.listen(3000);
}
bootstrap();
