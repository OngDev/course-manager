import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/service';
import { JwtService } from '@nestjs/jwt';
import { isMatch, hashPassword } from './utils';
import { RegisterPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const account = await this.accountService.findOne(username);
    if (account && isMatch(pass, account.password)) {
      const { password, ...result } = account;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register({
    email,
    fullname,
    password: rawPass,
  }: RegisterPayload): Promise<any> {
    const hashedPassword = await hashPassword(rawPass);
    const account = {
      username: email,
      password: hashedPassword,
    };
    const newAccount = await this.accountService.createNewAccount(account);
    // TODO: Create new User
  }
}
