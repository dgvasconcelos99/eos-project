import { PostEntity } from 'src/posts/entities/post.entity';
import { UserEntity } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'comments' })
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => PostEntity)
  post: PostEntity;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column()
  description: string;
}
