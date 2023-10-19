import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body(new ValidationPipe()) createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':userId')
  findByUser(@Param('userId') userId: string) {
    return this.postsService.findByUser(userId);
  }

  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body(new ValidationPipe()) updatePostDto: UpdatePostDto,
  ) {
    const user = req.user;
    if (user.userId !== req.params.id)
      throw new UnauthorizedException('Operation not permitted');
    return this.postsService.update(id, updatePostDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.postsService.remove(id, req.user);
  }

  @UseGuards(AuthGuard)
  @Post('like/:postId')
  likePost(@Req() req, @Param('postId') id: string) {
    return this.postsService.like(req.user, id);
  }
}
