import { CommentEntity } from 'src/comments/entities/comment.entity';
import { UserEntity } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'posts' })
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @Column()
  userId: string;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: string;

  @Column('simple-array', { nullable: true })
  hashtags: string[];

  @Column({ default: 0 })
  likes: number;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments?: CommentEntity[];

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: false })
  deletedAt?: string;
}
