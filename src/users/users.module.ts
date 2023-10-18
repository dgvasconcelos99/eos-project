import { Module } from '@nestjs/common';
import { userProviders } from './users.providers';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UserSchema } from './user.schema';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  providers: [...userProviders, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
