import { Column, Entity, OneToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import { User } from '../user/model';

@Entity('Accounts')
export default class Account extends BaseEntity {
  @Column({ type: 'varchar', length: 20, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 300 })
  password: string;

  @Column({ type: 'boolean', default: true })
  isActivated: boolean;

  @OneToOne(() => User, (user) => user.account)
  user: User;
}
