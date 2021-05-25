import { BaseEntity, Column, Entity } from 'typeorm';

@Entity('Accounts')
export default class Account extends BaseEntity {
  @Column({ type: 'varchar', length: 20, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 300 })
  password: string;

  // Map to UserDetail
  //   @Column({ type: 'varchar', length: 300 })
  //   userId: string;
}
