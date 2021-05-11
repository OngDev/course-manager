import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Account } from './accounts.model';
import { AccountsService } from './accounts.service';
import {CreateAccountDto} from './dto/create-account.dto'

@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService) {}

    @Get()
    getAllAccounts(): Account[]{
        return this.accountsService.getAllAccounts();
    }

    @Get('/:id')
    getAccountById(@Param('id') id: string): Account{
        return this.accountsService.getAccountById(id);
    }

    @Post()
    createAccount(@Body() createAccountDto: CreateAccountDto): Account{
        return this.accountsService.createAccount(createAccountDto);
    }
    
    @Patch(':/id')
    updateAccount(
        @Param('id') id: string, 
        @Body('username') username: string, 
        @Body('email') email: string, 
        @Body('password') password: string
    ){
        this.accountsService.updataAccount(id, username, email, password);
    }


    @Delete(':/id')
    deleteAccount(@Param('id') id: string){
        this.accountsService.deleteAccount(id);    
    }

}
