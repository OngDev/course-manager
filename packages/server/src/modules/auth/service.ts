import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AccountService } from '../account/service';
import { JwtService } from '@nestjs/jwt';
import { isMatch, hashPassword } from './utils';
import { RegisterPayload, TokenPayload } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/model';
import Role from '../role/model';
import { AccountCreationDTO } from '../account/dto/account-creation.dto';
import { configService } from '../../config/config.service';
import Account from '@modules/account/model';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
    private readonly accountService: AccountService,
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

  async login(account: any) {
    const {
      username,
      user: { userId, email, fullName },
    } = account;
    const cookie = this.getCookieWithJwtToken(username, userId);
    return {
      cookie,
      user: {
        userId,
        email,
        fullName,
        username,
      },
    };
  }

  async register({
    username,
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
      const userRole = await this.roleRepository.findOneOrFail({
        name: 'USER',
      });
      const existedAccount = await this.accountService.findOne(username);
      if (existedAccount) {
        throw new Error('Username is existed');
      }
      const existedUser = await this.userRepository.findOne({
        where: { email },
      });
      if (existedUser) {
        throw new Error('Email is existed');
      }

      const newAccount = await this.accountService.createNewAccount(account);
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
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error);
    }
  }

  getCookieWithJwtToken(username: string, userId: string) {
    const payload: TokenPayload = { username, userId };
    const token = this.jwtService.sign(payload);
    const {
      signOptions: { expiresIn },
    } = configService.getJwtConfig();
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expiresIn}`;
  }
}
