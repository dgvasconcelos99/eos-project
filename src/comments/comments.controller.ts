import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':id')
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('postId') postId: string,
  ) {
    return this.commentsService.create(postId, createCommentDto);
  }

  @Get(':postId')
  findAll(@Param('postId') postId: string) {
    return this.commentsService.findAll(postId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.commentsService.remove(req.user, id);
  }
}
