import { Permission } from 'src/permission/entities/permission.entity';
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

  @Column('text')
  avatarUri: string;

  @Column()
  gender: boolean;

  @Column()
  deleted: boolean;

  @ManyToOne(() => Permission, (permission) => permission.id)
  @JoinTable()
  per_: Permission;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
