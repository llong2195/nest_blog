import { Blog } from '../../blog/entities/blog.entity';
import { Category } from '../../category/entities/category.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BlogCat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Blog, (blog) => blog.id)
  @JoinColumn()
  blog_: number;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn()
  cat_: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
