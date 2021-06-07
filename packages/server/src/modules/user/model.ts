import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import Account from '../account/model';
import Role from '../role/model';
import BaseEntity from '../base/base.entity';
import { IAdmin, IMod, ISupporter, IUser } from './types';
import { ApiResponseProperty } from '@nestjs/swagger';

@Entity('Supporters')
class Supporter implements ISupporter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne('User', 'supporter')
  user: IUser;
}

@Entity('Admins')
class Admin implements IAdmin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne('User', 'admin')
  user: IUser;
}

@Entity('Mods')
class Mod implements IMod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne('User', 'mod')
  user: IUser;
}
@Entity('Users')
class User extends BaseEntity implements IUser {
  @Column({ type: 'varchar', unique: true })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is not valid' })
  @ApiResponseProperty()
  email: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  @ApiResponseProperty()
  fullName: string;

  @OneToOne(() => Account, (account) => account.user)
  @JoinColumn()
  @ApiResponseProperty({ type: Account })
  account: Account;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  @ApiResponseProperty({ type: [Role] })
  roles: Role[];

  @OneToOne('Admin', 'user')
  @JoinColumn()
  admin?: IAdmin;

  @OneToOne('Supporter', 'user')
  @JoinColumn()
  supporter?: ISupporter;

  @OneToOne('Mod', 'user')
  @JoinColumn()
  mod?: IMod;
}

export { User, Admin, Supporter, Mod };
