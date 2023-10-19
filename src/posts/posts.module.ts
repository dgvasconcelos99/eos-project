import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { PostEntity } from './entities/post.entity';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    forwardRef(() => UsersModule),
    forwardRef(() => CommentsModule),
  ],
  exports: [PostsService],
})
export class PostsModule {}
