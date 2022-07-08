import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '8 cách tăng sự tự tin', description: 'Title Blog' })
  @Column()
  title: string;

  @Column()
  slug: string;

  @ApiProperty({
    example: 'Sự tự tin hầu như không có sẵn trong mỗi người.',
    description: 'content blog',
  })
  @Column('text')
  content: string;

  @ApiProperty({
    example: 'true',
    description: 'Published || true , false, 1, 0, ...',
  })
  @Column({ default: true })
  isPublished: boolean;

  @ApiProperty({
    example: '1',
    description: 'id user',
  })
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user_: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
