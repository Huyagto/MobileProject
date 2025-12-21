// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import { CloudinaryModule } from './common/cloud/cloudinary.module';
import { UploadScalar } from './common/scalars/upload.scalar';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dating-app'),
    
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false, // Tắt playground cũ
      plugins: [ApolloServerPluginLandingPageLocalDefault()], // Dùng Apollo Sandbox mới
      // KHÔNG cần resolvers config ở đây
       csrfPrevention: false,
    }),
    
    AuthModule,
    UsersModule,
    ProfileModule,
    CloudinaryModule,
  ],
  providers: [UploadScalar], // Chỉ cần provider
})
export class AppModule {}