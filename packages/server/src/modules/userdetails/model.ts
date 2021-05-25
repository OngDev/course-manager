import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { Account } from '../accounts/model';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'userdetail' })
export class UserDetail extends BaseEntity {  
    @OneToOne(type => Account)
    @JoinColumn()
    account: Account
}
