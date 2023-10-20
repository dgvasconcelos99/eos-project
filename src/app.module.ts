import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import 'dotenv/config';
import { UserEntity } from './users/entities/users.entity';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';
import { UsersController } from './users/users.controller';
import { PostsController } from './posts/posts.controller';
import { CommentsController } from './comments/comments.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.develop',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [UserEntity],
      synchronize: process.env.NODE_ENV === 'development',
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
  ],
  controllers: [
    AppController,
    UsersController,
    PostsController,
    CommentsController,
  ],
  providers: [AppService],
})
export class AppModule {}
