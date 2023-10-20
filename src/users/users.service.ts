import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: CreateUserDto): Promise<UserEntity | undefined> {
    const searchUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (searchUser?.id) throw new NotFoundException('User already exists');

    return await this.userRepository.save(user);
  }

  async update(
    id: string,
    updatePostDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userRepository.update(id, updatePostDto);
  }

  async findOne(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findOneById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async remove(id: string): Promise<DeleteResult> {
    const searchUser = await this.findOneById(id);
    if (!searchUser.id)
      throw new UnauthorizedException('Operation not permitted');
    return await this.userRepository.softDelete(id);
  }
}
