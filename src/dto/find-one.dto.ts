import { IsNotEmpty, IsString } from 'class-validator';

export class FindOneDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
