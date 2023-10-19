import { PostEntity } from 'src/posts/entities/post.entity';
import { UserEntity } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'comments' })
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PostEntity)
  post: PostEntity;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column()
  comment: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: string;
}
