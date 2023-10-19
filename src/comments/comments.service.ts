import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @Inject(PostsService)
    private readonly postService: PostsService,
  ) {}

  async create(
    postId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<CommentEntity | undefined> {
    const searchPost = await this.postService.findOne(postId);

    if (!searchPost.id) throw new NotFoundException('Post does not exist');

    return await this.commentRepository.create(createCommentDto);
  }

  async findAll(postId: string) {
    return await this.commentRepository.findBy({ post: { id: postId } });
  }

  async findOne(id: string): Promise<CommentEntity> {
    const searchcomment = await this.commentRepository.findOne({
      where: { id },
    });

    return searchcomment;
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    console.log(updateCommentDto);
    return `This action updates a #${id} comment`;
  }

  async remove(user, id: string): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (comment.id) throw new NotFoundException('Comment not found');
    if (comment.user.id !== user.id)
      throw new NotFoundException('Operation not permitted');
    await this.commentRepository.remove(comment);
    return;
  }
}
