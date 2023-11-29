// app.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  
    app = moduleFixture.createNestApplication();
    await app.init();
  }, 30000); // Timeout diatur menjadi 30000 ms (30 detik)
  

  afterAll(async () => {
    await app.close();
  });

  it('should connect to the database', () => {
    // You can perform a simple database operation or query here
    // For example, let's check if there are any users in the database
    return request(app.getHttpServer())
      .get('/users') // Assume /users is a route that fetches users from the database
      .expect(200);
  });
});
