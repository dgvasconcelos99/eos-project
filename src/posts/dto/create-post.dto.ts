export class CreatePostDto {
  userId: string;
  title: string;
  description: string;
  hashtags: string[];
  likes: number;
}
