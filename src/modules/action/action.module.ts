import { Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Action } from './entities/action.entity';

@Module({
  controllers: [ActionController],
  providers: [ActionService],
  imports: [TypeOrmModule.forFeature([Action])],
})
export class ActionModule {}
