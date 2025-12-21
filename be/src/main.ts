// src/main.ts
// XÓA dòng này:
// import { graphqlUploadKoa } from 'graphql-upload-ts';

// Thay bằng cấu hình đơn giản:
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.enableCors({
    origin: true, // Cho phép tất cả origins
    credentials: true, // Cho phép credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'x-apollo-operation-name',
      'apollo-require-preflight',
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Origin',
    ],
    exposedHeaders: ['Authorization'],
    maxAge: 86400, // 24 hours
  });
  await app.listen(3000);
  console.log(`🚀 Server running on http://localhost:3000/graphql`);
}
bootstrap();