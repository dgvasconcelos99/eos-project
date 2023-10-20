import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PostsModule } from 'src/posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [TypeOrmModule.forFeature([CommentEntity]), PostsModule],
  exports: [CommentsService],
})
export class CommentsModule {}
