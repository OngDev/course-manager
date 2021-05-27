import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
} from '@nestjs/common';
import { AccountDTO } from './dto/account';
import { AccountUpdationDTO } from './dto/account-updation.dto';
import { AccountService } from './service';

@Controller('accounts')
export class AccountController {
  constructor(
    private readonly logger: Logger,
    private readonly accountService: AccountService,
  ) {}

  // Find All Accounts
  @Get()
  async findAll(): Promise<AccountDTO[]> {
    try {
      return await this.accountService.findAll();
    } catch (error) {
      this.logger.error(error);
    }
  }

  // Find Account by Id
  @Get(':id')
  async findById(@Param('id') id: string): Promise<AccountDTO> {
    try {
      return await this.accountService.findById(id);
    } catch (error) {
      this.logger.error(error);
    }
  }

  // Update Account by Id
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() accountUpdationDTO: AccountUpdationDTO,
  ): Promise<AccountDTO> {
    try {
      return await this.accountService.update(id, accountUpdationDTO);
    } catch (error) {
      this.logger.error(error);
    }
  }

  // Deleta Account By Id
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.accountService.remove(id);
  }
}
