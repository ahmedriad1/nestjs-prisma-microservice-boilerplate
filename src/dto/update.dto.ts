import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateDto } from './create.dto';

export class UpdateDto extends PartialType(CreateDto) {
  @IsNotEmpty()
  @IsString()
  id: string;
}
