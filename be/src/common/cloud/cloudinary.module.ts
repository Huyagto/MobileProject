// src/common/cloud/cloudinary.module.ts
import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary';

@Module({
  providers: [CloudinaryService],
  exports: [CloudinaryService], // Quan trọng: export để module khác dùng
})
export class CloudinaryModule {}