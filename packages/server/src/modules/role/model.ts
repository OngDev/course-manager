import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import { User } from '../user/model';

@Entity('Roles')
export default class Role extends BaseEntity {
  @Column({ type: 'varchar', length: 200 })
  @ApiProperty()
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
