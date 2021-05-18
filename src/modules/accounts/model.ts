import { Column, Entity} from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'account' })
export class Account extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  usename: string;

  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Column({ type: 'varchar', length: 300 })
  password: string;
}
