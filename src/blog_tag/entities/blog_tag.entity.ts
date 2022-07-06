import { Blog } from 'src/blog/entities/blog.entity';
import { Tag } from '../../tag/entities/tag.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BlogTag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Blog, (blog) => blog.id)
  @JoinColumn()
  blog_: Blog;

  @ManyToOne(() => Tag, (tag) => tag.id)
  @JoinColumn()
  tag_: Tag;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
