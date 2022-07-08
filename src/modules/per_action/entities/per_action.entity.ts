import { Action } from 'src/modules/action/entities/action.entity';
import { Permission } from 'src/modules/permission/entities/permission.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Table_Name {
  BLOG = 'BLOG',
  ACTION = 'ACTION',
  CATEGORY = 'CATEGORY',
  COMMENT = 'COMMENT',
  PERMISSION = 'PERMISSION',
  TAG = 'TAG',
  USER = 'USER',
}

@Entity()
export class PerAction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Permission, (permission) => permission.id)
  @JoinColumn()
  per_: number;

  @ManyToOne(() => Action, (action) => action.id)
  @JoinColumn()
  action_: number;

  @Column({
    type: 'enum',
    enum: Table_Name,
  })
  table_name: Table_Name;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
