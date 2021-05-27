import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import Account from '../account/model';
import Role from '../role/model';
import { BaseEntity } from '../base/base.entity';
import Admin from './usertypes/admin';
import Supporter from './usertypes/supporter';
import Mod from './usertypes/mod';

@Entity('Users')
export default class User extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  fullName: string;

  @OneToOne(() => Account, (account) => account.user)
  @JoinColumn()
  account: Account;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @OneToOne(() => Admin, (admin) => admin.user)
  @JoinColumn()
  admin?: Admin;

  @OneToOne(() => Supporter, (supporter) => supporter.user)
  @JoinColumn()
  supporter?: Supporter;

  @OneToOne(() => Mod, (mod) => mod.user)
  @JoinColumn()
  mod?: Mod;
}
