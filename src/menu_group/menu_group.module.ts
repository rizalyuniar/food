import { Module } from '@nestjs/common';
import { MenuGroupService } from './menu_group.service';
import { MenuGroupController } from './menu_group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuGroup } from './entities/menu_group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuGroup])],
  controllers: [MenuGroupController],
  providers: [MenuGroupService],
})
export class MenuGroupModule {}
