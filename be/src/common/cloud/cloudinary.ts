// src/common/cloud/cloudinary.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';

const cloudinary = require('cloudinary').v2;

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  width?: number;
  height?: number;
  format?: string;
}

interface UploadOptions {
  width?: number;
  height?: number;
  crop?: string;
  gravity?: string;
  quality?: string;
  format?: string;
}

@Injectable()
export class CloudinaryService implements OnModuleInit {
  constructor() {}

  onModuleInit() {
    // Validate environment variables
    const requiredEnvVars = [
      'CLOUDINARY_CLOUD_NAME',
      'CLOUDINARY_API_KEY', 
      'CLOUDINARY_API_SECRET'
    ];
    
    const missingVars = requiredEnvVars.filter(
      envVar => !process.env[envVar]
    );
    
    if (missingVars.length > 0) {
      console.warn(`Missing Cloudinary env vars: ${missingVars.join(', ')}`);
      console.warn('Cloudinary uploads may not work properly');
    } else {
      // Configure Cloudinary
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      });
      console.log('Cloudinary configured successfully');
    }
  }

  async uploadImage(
    file: { buffer: Buffer }, 
    folder: string, 
    options?: UploadOptions
  ): Promise<CloudinaryUploadResponse> {
    return new Promise((resolve, reject) => {
      const base64Image = `data:image/jpeg;base64,${file.buffer.toString('base64')}`;
      
      const transformations: any[] = [];
      
      if (options?.width && options?.height) {
        const transformation: any = { 
          width: options.width, 
          height: options.height, 
          crop: options.crop || 'fill'
        };
        
        if (options.gravity) {
          transformation.gravity = options.gravity;
        }
        
        transformations.push(transformation);
      }
      
      if (options?.quality) {
        transformations.push({ quality: options.quality });
      }
      
      if (options?.format) {
        transformations.push({ format: options.format });
      }
      
      const finalTransformations = transformations.length > 0 
        ? transformations 
        : [
            { width: 1080, height: 1350, crop: 'fill' },
            { quality: 'auto' },
            { format: 'webp' }
          ];
      
      cloudinary.uploader.upload(base64Image, {
        folder,
        transformation: finalTransformations
      }, (error: any, result: any) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(new Error(`Cloudinary upload failed: ${error.message}`));
        } else {
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
          });
        }
      });
    });
  }

  async deleteImage(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error: any, result: any) => {
        if (error) {
          console.error('Cloudinary delete error:', error);
          reject(new Error(`Failed to delete image: ${error.message}`));
        } else {
          resolve(result);
        }
      });
    });
  }
}