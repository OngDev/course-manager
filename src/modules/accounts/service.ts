import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './model';
import { AccountCreationDTO } from './dto/account-creation.dto';
import { AccountUpdationDTO } from './dto/account-updation.dto';

@Injectable()
export class AccountService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  // Create Account
  create(courseDTO: AccountCreationDTO): Promise<Account> {
    try {
      return this.accountRepository.save(courseDTO);
    } catch (error) {
      this.logger.error(error);
    }
  }

  // Find All Accounts
  findAll(): Promise<Account[]> {
    try {
      return this.accountRepository.find();
    } catch (error) {
      this.logger.error(error);
    }
  }

  // Find Account by Id
  findById(id: string): Promise<Account> {
    try {
      return this.accountRepository.findOne(id);
    } catch (error) {
      this.logger.error(error);
    }
  }

  // Update Account by Id
  async update(
    id: string,
    updateAccountDto: AccountUpdationDTO,
  ): Promise<Account> {
    try {
      await this.accountRepository.update({ id }, { ...updateAccountDto });
      return this.accountRepository.findOne({ id });
    } catch (error) {
      this.logger.error(error);
    }
  }

  // Delete account by id
  async remove(id: string): Promise<any> {
    try {
      await this.accountRepository.delete({ id });
      return { message: 'ok' };
    } catch (error) {
      this.logger.error(error);
    }
  }
}
