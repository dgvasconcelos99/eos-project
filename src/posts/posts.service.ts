import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const searchUser = await this.usersService.findOneById(
      createPostDto.userId,
    );

    if (!searchUser.id) throw new NotFoundException('User does not exist');

    const newPost: PostEntity = new PostEntity();

    const { userId, title, description, hashtags } = createPostDto;
    const dataToCreate = {
      userId,
      title,
      description,
      hashtags,
      likes: newPost.likes,
    };

    return this.postRepository.save(dataToCreate);
  }

  async findAll() {
    return await this.postRepository.find();
  }

  async findByUser(userId: string): Promise<PostEntity[]> {
    const posts = await this.postRepository.find({
      where: {
        userId,
      },
    });

    return posts;
  }

  async findOne(id: string): Promise<PostEntity> {
    const post = await this.postRepository.findOne({ where: { id } });

    return post;
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<UpdateResult> {
    return await this.postRepository.update(id, updatePostDto);
  }

  async remove(id: string, user: any): Promise<DeleteResult> {
    const searchPost = await this.findOne(id);
    if (user.sub !== searchPost.userId)
      throw new UnauthorizedException('Operation not permitted');
    return await this.postRepository.softDelete(id);
  }

  async like(user, id: string): Promise<void> {
    const searchPost = await this.findOne(id);
    if (!searchPost.id) throw new NotFoundException('Post not found');
    await this.postRepository.update(id, {
      likes: ++searchPost.likes,
    });
    return;
  }
}
