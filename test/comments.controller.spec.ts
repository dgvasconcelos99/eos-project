import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { CommentsService } from 'src/comments/comments.service';
import { Repository } from 'typeorm';

describe('CommentsService', () => {
  let commentsService: CommentsService;
  let commentRepository: Repository<CommentEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(CommentEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    commentsService = module.get<CommentsService>(CommentsService);
    commentRepository = module.get<Repository<CommentEntity>>(
      getRepositoryToken(CommentEntity),
    );
  });

  it('should be defined', () => {
    expect(commentsService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new comment', async () => {
      const createCommentDto: CreateCommentDto = {
        postId: 'post123',
        userId: 'user123',
        comment: 'A new comment',
      };

      const savedComment = new CommentEntity();
      jest
        .spyOn(commentsService['commentService'], 'findOne')
        .mockResolvedValue({
          id: 'comment123',
          userId: 'user123',
          comment: 'A new comment',
        });
      jest.spyOn(commentRepository, 'save').mockResolvedValue(savedComment);

      const result = await commentsService.create('post123', createCommentDto);

      expect(result).toBe(savedComment);
    });

    it('should throw NotFoundException for non-existent post', async () => {
      const createCommentDto: CreateCommentDto = {
        postId: 'post123',
        userId: 'user123',
        comment: 'A new comment',
      };

      jest
        .spyOn(commentsService['postService'], 'findOne')
        .mockResolvedValue(null);

      try {
        await commentsService.create('post123', createCommentDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Post not found');
      }
    });
  });

  // Add more test cases for other methods of the CommentsService.
});
