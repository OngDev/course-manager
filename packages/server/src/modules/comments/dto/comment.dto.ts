import { IsNotEmpty, IsString } from 'class-validator';

export class CommentDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
