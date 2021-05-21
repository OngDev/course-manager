import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { ReactionType } from 'src/common/enums/reaction-type.enum';

export class CommentReactionCreationDTO {
  @ApiProperty({ default: '' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ default: '' })
  @IsString()
  @IsNotEmpty()
  commentId: string;

  @ApiProperty({ default: ReactionType.LIKE })
  @IsEnum(ReactionType)
  @IsNotEmpty()
  type: string;
}
