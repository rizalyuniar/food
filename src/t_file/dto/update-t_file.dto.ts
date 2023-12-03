import { PartialType } from '@nestjs/swagger';
import { CreateTFileDto } from './create-t_file.dto';

export class UpdateTFileDto extends PartialType(CreateTFileDto) {}
