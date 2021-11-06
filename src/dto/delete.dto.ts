import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
