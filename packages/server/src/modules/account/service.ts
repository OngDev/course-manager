import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountDTO } from './dto/account';
import { AccountUpdationDTO } from './dto/account-updation.dto';
import { mapAccountToAccountDTO } from './mapper';
import Account from './model';

@Injectable()
export class AccountsService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async findOne(username: string): Promise<Account | undefined> {
    return this.accountRepository.findOne({
      where: {
        username,
      },
      relations: ['user'],
    });
  }

  async findAll(): Promise<AccountDTO[]> {
    try {
      const accounts = await this.accountRepository.find();
      return accounts.map(mapAccountToAccountDTO);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  // Find Account by Id
  async findById(id: string): Promise<AccountDTO> {
    try {
      const account = await this.accountRepository.findOne(id);
      if (!account)
        throw new NotFoundException(`Account with id ${id} is not found`);
      return mapAccountToAccountDTO(account);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  // Update Account by Id
  async update(
    id: string,
    updateAccountDto: AccountUpdationDTO,
  ): Promise<AccountDTO> {
    try {
      const updatedAccount = await this.accountRepository.save({
        id,
        ...updateAccountDto,
      });

      return mapAccountToAccountDTO(updatedAccount);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  // Delete account by id
  async remove(id: string): Promise<boolean> {
    try {
      const result = await this.accountRepository.delete({ id });
      return result.affected !== null;
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  async checkUsernameExisted(username: string): Promise<void> {
    const existedAccount = await this.accountRepository.findOne({
      where: {
        username,
      },
    });
    if (existedAccount) {
      throw new Error('Username is existed');
    }
  }
}
