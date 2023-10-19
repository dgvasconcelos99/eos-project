import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: CreateUserDto): Promise<UserEntity | undefined> {
    return await this.userRepository.create(user);
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
