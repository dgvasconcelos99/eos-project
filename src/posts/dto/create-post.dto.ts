import { IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  userId: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @MaxLength(40, {
    each: true,
  })
  hashtags: string[];
}
