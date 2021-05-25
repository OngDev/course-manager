import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from 'winston';
import { Video } from '../video/model';
import Account from './model';

@Injectable()
export class AccountService {
  createNewAccount(account: { username: string; password: string; }) {
      throw new Error('Method not implemented.');
  }
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Video)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async findOne(username: string): Promise<Account | undefined> {
    return this.accountRepository.findOne({
      where: {
        username,
      },
    });
  }
}
