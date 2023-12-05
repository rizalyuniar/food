import { PartialType } from '@nestjs/swagger';
import { CreateMenuGroupDto } from './create-menu_group.dto';

export class UpdateMenuGroupDto extends PartialType(CreateMenuGroupDto) {}
