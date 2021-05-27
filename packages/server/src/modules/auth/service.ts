import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AccountService } from '../account/service';
import { JwtService } from '@nestjs/jwt';
import { isMatch, hashPassword } from './utils';
import { RegisterPayload } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/model';
import Role from '../role/model';
import { AccountCreationDTO } from '../account/dto/account-creation.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: Logger,
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
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
    try {
      const hashedPassword = await hashPassword(rawPass);
      const account: AccountCreationDTO = {
        username: email,
        password: hashedPassword,
      };
      const newAccount = await this.accountService.createNewAccount(account);
      const userRole = await this.roleRepository.findOneOrFail({
        name: 'USER',
      });
      const newUser = await this.userRepository.save({
        email,
        account: newAccount,
        roles: [userRole],
        fullName: fullname,
      });
      return this.login({
        username: newAccount.username,
        userId: newUser.id,
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error);
    }
  }
}
