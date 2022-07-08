import { Permission } from '../../permission/entities/permission.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ length: 20 })
  phonenumber: string;

  @Column('text', { default: null })
  avatarUri: string;

  @Column()
  gender: boolean;

  @Column({ default: false })
  deleted: boolean;

  @ManyToOne(() => Permission, (permission) => permission.id)
  @JoinTable()
  per_: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
