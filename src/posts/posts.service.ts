import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository, UpdateResult } from 'typeorm';
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

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<UpdateResult> {
    return await this.postRepository.update(id, updatePostDto);
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
