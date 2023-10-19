import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository, UpdateResult } from 'typeorm';
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
    return await this.userRepository.create(user);
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
        email,
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
}
