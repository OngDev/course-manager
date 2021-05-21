import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
  import { AccountCreationDTO } from './dto/account-creation.dto';
  import { AccountUpdationDTO } from './dto/account-updation.dto';
  import { Account } from './model';
  import { AccountService } from './service';
  
  @Controller('courses')
  export class AccountController {
    constructor(
      private readonly logger: Logger,
      private readonly accountService: AccountService,
    ) {}
  
    // Find All Accounts
    @Get()
    findAll(): Promise<Account[]> {
      try {
        return this.accountService.findAll();
      } catch (error) {
        this.logger.error(error);
      }
    }
  
    // Find Account by Id
    @Get(':id')
    findById(@Param('id') id: string): Promise<Account> {
      try {
        return this.accountService.findById(id);
      } catch (error) {
        this.logger.error(error);
      }
    }

    // Create Account
    @Post()
    create(@Body() accountCreationDTO: AccountCreationDTO): Promise<Account> {
      try {
        return this.accountService.create(accountCreationDTO);
      } catch (error) {
        this.logger.error(error);
      }
    }
  
    // Update Account by Id
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() accountUpdationDTO: AccountUpdationDTO,
    ): Promise<Account> {
      try {
        return this.accountService.update(id, accountUpdationDTO);
      } catch (error) {
        this.logger.error(error);
      }
    }
  
    // Deleta Account By Id
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.accountService.remove(id);
    }
  }
  