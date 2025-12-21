// src/modules/auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RedisService } from "@/infra/redis/redis.service";
import { UserService } from "@/modules/users/user.service";
import { ProfileService } from "@/modules/profile/profile.service";
import { CloudinaryService } from "@/common/cloud/cloudinary"; // Thêm import
import { normalizePhone } from "@/utils/phone.util";
import { OnboardingInput } from "./dto/onboarding.input";
import { AuthPayload } from "./dto/auth.payload";

interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => NodeJS.ReadableStream;
}

interface UploadedPhoto {
    url: string;
    publicId: string;
    caption: string;
    order: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly redisService: RedisService,
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    private readonly cloudinaryService: CloudinaryService, // Thêm CloudinaryService
    private readonly jwtService: JwtService,
  ) {}

  /* ===== SEND OTP ===== */
  async sendOtp(phone: string): Promise<{ userExists: boolean }> {
    const normalized = normalizePhone(phone);
    const user = await this.userService.findByPhone(normalized);
    const userExists = !!user;
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.redisService.setOtp(normalized, otp);
    
    console.log(`🔥 OTP ${normalized}: ${otp}`);
    return { userExists };
  }

  /* ===== SIGNUP OTP ===== */
  async verifySignupOtp(phone: string, otp: string) {
    const normalized = normalizePhone(phone);
    const savedOtp = await this.redisService.getOtp(normalized);
    
    if (!savedOtp || savedOtp !== otp) {
      throw new UnauthorizedException("OTP invalid");
    }
    
    await this.redisService.deleteOtp(normalized);
    
    return {
      signupToken: this.jwtService.sign(
        { phone: normalized },
        { expiresIn: "15m" },
      ),
    };
  }

  /* ===== LOGIN OTP ===== */
  async verifyLoginOtp(phone: string, otp: string): Promise<AuthPayload> {
    const normalized = normalizePhone(phone);
    const savedOtp = await this.redisService.getOtp(normalized);
    
    if (!savedOtp || savedOtp !== otp) {
      throw new UnauthorizedException("OTP invalid");
    }
    
    await this.redisService.deleteOtp(normalized);
    const user = await this.userService.findByPhone(normalized);
    
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    
    const accessToken = this.jwtService.sign(
      { sub: user._id.toString(), phone: normalized },
      { expiresIn: "7d" },
    );
    
    return {
      accessToken,
      user: {
        id: user._id.toString(),
        phone: user.phone,
        
      },
    };
  }

  /* ===== SUBMIT ONBOARDING WITH PHOTOS ===== */
  async submitOnboarding(
    signupToken: string,
    input: OnboardingInput,
  ): Promise<AuthPayload> {
    // Verify signup token
    let payload: any;
    try {
      payload = this.jwtService.verify(signupToken);
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired signup token");
    }
    
    const phone = payload.phone;
    let user = await this.userService.findByPhone(phone);
    
    if (!user) {
      user = await this.userService.create({ phone });
    }

    // Upload photos
    const uploadedPhotos = await this.processOnboardingPhotos(
      user._id.toString(),
      input.photos
    );

    // Create profile với photos
    await this.profileService.createProfileWithPhotos(
  user._id.toString(),
  {
    name: input.name,
    gender: input.gender,
    birthday: input.birthday, // string
    preferenceGender: input.preferenceGender, // string
    interests: input.interests || [],
    habits: input.habits || [],
    bio: input.bio || '',
    coordinates: input.coordinates || [105.85, 21.02], // Default Hà Nội
    photos: uploadedPhotos,
  }
);

    const accessToken = this.jwtService.sign(
      { sub: user._id.toString(), phone },
      { expiresIn: "7d" },
    );
    
    return {
      accessToken,
      user: {
        id: user._id.toString(),
        phone: user.phone,
      },
    };
  }

  /* ===== PROCESS PHOTOS ===== */
  private async processOnboardingPhotos(
    userId: string,
    photoPromises: Promise<FileUpload>[]
  ): Promise<UploadedPhoto[]> {
    if (!photoPromises || photoPromises.length < 2) {
      throw new BadRequestException('Cần ít nhất 2 ảnh');
    }

    if (photoPromises.length > 9) {
      throw new BadRequestException('Tối đa 9 ảnh');
    }

    const uploadedPhotos: UploadedPhoto[] = [];
    
    for (let i = 0; i < photoPromises.length; i++) {
      try {
        const file = await photoPromises[i];
        
        // Convert stream to buffer
        const stream = file.createReadStream();
        const chunks: Buffer[] = [];
        
        for await (const chunk of stream) {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        }
        const buffer = Buffer.concat(chunks);

        // Upload to Cloudinary
        const uploadResult = await this.cloudinaryService.uploadImage(
          { buffer }, // Đúng định dạng mà CloudinaryService mong đợi
          `profiles/${userId}`,
          {
            width: 1080,
            height: 1350,
            crop: 'fill',
            gravity: 'face',
            quality: 'auto',
            format: 'webp'
          }
        );
        
        uploadedPhotos.push({
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
          caption: `Photo ${i + 1}`, // Có thể để user nhập caption sau
          order: i
        });

        console.log(`✅ Uploaded photo ${i + 1}/${photoPromises.length}`);
        
      } catch (error) {
        console.error(`❌ Failed to upload photo ${i + 1}:`, error);
        throw new BadRequestException(`Upload photo ${i + 1} failed: ${error.message}`);
      }
    }
    
    return uploadedPhotos;
  }

  // Xóa phương thức uploadImage mock nếu không cần nữa
  /*
  private async uploadImage(
    buffer: Buffer,
    mimetype: string,
    folder: string
  ): Promise<{ url: string; publicId?: string }> {
    // Mock implementation - replace with Cloudinary in production
    const mockImages = [
      'https://images.unsplash.com/photo-1494790108077-c5e8c6f78764',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
    ];
    
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    
    return {
      url: `${randomImage}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&h=1350&q=80`,
      publicId: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }
  */
}