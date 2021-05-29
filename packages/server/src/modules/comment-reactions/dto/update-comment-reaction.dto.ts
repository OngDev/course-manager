import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { ReactionType } from 'src/common/enums/reaction-type.enum';

export class CommentReactionUpdatingDTO {
  @ApiProperty({ default: ReactionType.LIKE })
  @IsEnum(ReactionType)
  @IsNotEmpty()
  type: string;
}
