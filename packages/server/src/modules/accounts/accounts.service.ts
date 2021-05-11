import { Injectable } from '@nestjs/common';
import { Account } from './accounts.model';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {

    private accounts: Account[] = [];

    getAllAccounts(): Account[]{
        try{
            return this.accounts;

        }catch(err){
            console.log(err)
        }
    }

    getAccountById(id: string): Account{
        try{
            return this.accounts.find(account => account.id === id);

        }catch(err){
            console.log(err)
        }
    }

    createAccount(createAccountDto: CreateAccountDto): Account{
        try{
            const {id, createdAt, username, email, password} = createAccountDto;
            const account: Account = {
                id,
                createdAt,
                username,
                password,
                email
            }
            this.accounts.push(account);
            return account;
        }catch(err){
            console.log(err);
        }
        
    }

    updataAccount(id: string, usename: string, email: string, password: string): Account{
        try{
            const account = this.getAccountById(id);
            account.email = email;
            account.username = usename;
            account.password = password;
            return account;
            
        }catch(err){
            console.log(err)
        }
    }

    deleteAccount(id: string){
        try{
            this.accounts = this.accounts.filter(account => account.id !== id);

        }catch(err){
            console.log(err)
        }
    }
}
