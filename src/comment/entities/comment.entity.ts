import { Blog } from 'src/blog/entities/blog.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  context: string;

  @ManyToOne(() => Blog, (blog) => blog.id)
  @JoinColumn()
  blog_: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user_: number;

  @OneToOne(() => Comment, (comment) => comment.id)
  @JoinColumn()
  parent_: Comment;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
