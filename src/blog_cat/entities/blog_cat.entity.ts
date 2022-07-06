import { Blog } from 'src/blog/entities/blog.entity';
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
  blog_: Blog;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn()
  cat_: Category;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
