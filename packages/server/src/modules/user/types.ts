import { ApiProperty } from '@nestjs/swagger';

export interface IUser {
  id: string;
  email: string;
  fullName: string;
}

export interface IAdmin {
  id: string;
}
export interface IMod {
  id: string;
}
export interface ISupporter {
  id: string;
}

export class UserCreationPayload {
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  roles: string[];
}
