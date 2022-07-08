import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'đời sống', description: 'Tag name' })
  @Column()
  name: string;

  @Column()
  slug: string;

  @ApiProperty({
    example: 'Tag về đời sống',
    description: 'The description of tag',
  })
  @Column('text')
  description: string;

  @ApiProperty({
    example: true,
    description: 'Boolean',
  })
  @Column({ default: false })
  isPublished: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
