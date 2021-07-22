import { ApiProperty } from '@nestjs/swagger';

export class RegisterPayload {
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  username: string;
}

export interface TokenPayload {
  username: string;
  userId: string;
}

export class LoginPayload {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
  Supporter = 'SUPPORTER',
  Mod = 'MOD',
}
