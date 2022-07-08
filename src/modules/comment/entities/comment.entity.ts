import { Blog } from '../../blog/entities/blog.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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
  blog_: Blog;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user_: User;

  @Column({ default: 0 })
  parent_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
