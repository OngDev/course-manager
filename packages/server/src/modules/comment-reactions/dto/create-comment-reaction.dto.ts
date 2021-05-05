import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { ReactionType } from 'src/common/enums/reaction-type.enum';

export class CreateCommentReactionDto {
  @ApiProperty({ default: ReactionType.LIKE })
  @IsEnum(ReactionType)
  @IsNotEmpty()
  type: string;
}
