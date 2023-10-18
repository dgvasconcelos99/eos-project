import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UsersConstants } from './constants';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersConstants.userRepository)
    private userRepository: Repository<UserEntity>,
  ) {}
  async findOne(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.find((user) => user.email === email);
  }

  async create(user: CreateUserDto): Promise<UserEntity | undefined> {
    return this.userRepository.create(user);
  }
}
