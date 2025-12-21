import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    // 🔥 MONGODB CONNECTION (BẮT BUỘC)
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/dating-app'),

    // 🔥 GRAPHQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),

    AuthModule,
  ],
})
export class AppModule {}
