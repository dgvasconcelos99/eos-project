import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { UsersController } from './users.controller';

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
      controllers: [UsersController],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findOneById', () => {
    it('should find a user by ID', async () => {
      const userId = 'user123';
      const userToFind = new UserEntity();
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(userToFind);

      const result = await usersService.findOneById(userId);

      expect(result).toBe(userToFind);
    });

    it('should throw NotFoundException for a non-existent user', async () => {
      const userId = 'nonExistentUser';
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      try {
        await usersService.findOneById(userId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('User not found');
      }
    });
  });
});
