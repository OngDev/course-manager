import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Account from './model';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async findOne(username: string): Promise<Account | undefined> {
    return this.accountRepository.findOne({
      where: {
        username,
      },
    });
  }

  async createNewAccount(account: {
    username: string;
    password: string;
  }): Promise<Account> {
    return this.accountRepository.save(account);
  }
}
