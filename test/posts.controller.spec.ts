import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { PostEntity } from 'src/posts/entities/post.entity';
import { PostsService } from 'src/posts/posts.service';
import { Repository } from 'typeorm';

describe('PostsService', () => {
  let postsService: PostsService;
  let postRepository: Repository<PostEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(PostEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    postsService = module.get<PostsService>(PostsService);
    postRepository = module.get<Repository<PostEntity>>(
      getRepositoryToken(PostEntity),
    );
  });

  it('should be defined', () => {
    expect(postsService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new post', async () => {
      const createPostDto: CreatePostDto = {
        userId: 'user123',
        title: 'New Post',
        description: 'A test post',
        hashtags: ['test', 'post'],
      };

      const savedPost = new PostEntity();
      jest
        .spyOn(postsService['postsService'], 'findOneById')
        .mockResolvedValue({
          userId: 'user123',
          title: 'New Post',
          description: 'A test post',
          hashtags: ['test', 'post'],
        });
      jest.spyOn(postRepository, 'save').mockResolvedValue(savedPost);

      const result = await postsService.create(createPostDto);

      expect(result).toBe(savedPost);
    });

    it('should throw NotFoundException for non-existent user', async () => {
      const createPostDto: CreatePostDto = {
        userId: 'nonExistentUser',
        title: 'New Post',
        description: 'A test post',
        hashtags: ['test', 'post'],
      };

      jest
        .spyOn(postsService['usersService'], 'findOneById')
        .mockResolvedValue(null);

      try {
        await postsService.create(createPostDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('User does not exist');
      }
    });
  });

  it('should find a post by id', async () => {
    const postId = 'post123';
    const postToFind = new PostEntity();
    jest.spyOn(postRepository, 'findOne').mockResolvedValue(postToFind);

    const result = await postsService.findOne(postId);

    expect(result).toBe(postToFind);
  });

  it('should throw NotFoundException for a non-existent post', async () => {
    const postId = 'nonExistentPost';
    jest.spyOn(postRepository, 'findOne').mockResolvedValue(null);

    try {
      await postsService.findOne(postId);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Post not found');
    }
  });
});
