import { Account } from '../../accounts/model';
import { IsNotEmpty, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class AccountCreationDTO {
  @ApiProperty({ default: 'this is username' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ default: 'this is email' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ default: 'this is password' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  readonly password: string;
}
