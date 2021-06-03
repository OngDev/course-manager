import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isMatch, hashPassword } from './utils';
import { RegisterPayload, TokenPayload } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from '../user/model';
import Role from '../role/model';
import { configService } from '../../config/config.service';
import Account from '@modules/account/model';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private connection: Connection,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const account = await this.accountRepository.findOne({
        where: {
          username,
        },
        relations: ['user'],
      });
      if (account && isMatch(pass, account.password)) {
        const { id, email, fullName } = account.user;
        return {
          username: account.username,
          user: {
            id,
            email,
            fullName,
          },
        };
      }
      return null;
    } catch (error) {
      this.logger.error(error.message);
      return null;
    }
  }

  async validateJwtUser({ userId, username }): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        id: userId,
      });
      if (!user) {
        return null;
      }
      const { id, email, fullName } = user;
      return {
        username,
        id,
        email,
        fullName,
      };
    } catch (error) {
      return null;
    }
  }

  async login(account: any) {
    const {
      username,
      user: { id, email, fullName },
    } = account;
    const cookie = this.getCookieWithJwtToken(username, id);
    return {
      cookie,
      user: {
        id,
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
      const userRole = await this.roleRepository.findOneOrFail({
        name: 'USER',
      });
      const existedAccount = await this.accountRepository.findOne({
        where: {
          username,
        },
      });
      if (existedAccount) {
        throw new Error('Username is existed');
      }
      const existedUser = await this.userRepository.findOne({
        where: { email },
      });
      if (existedUser) {
        throw new Error('Email is existed');
      }
      await this.connection.transaction(async (manager) => {
        const newAccount = new Account();
        newAccount.username = username;
        newAccount.password = hashedPassword;
        this.logger.verbose(newAccount);
        await manager.save(newAccount);
        const newUser = new User();
        newUser.email = email;
        newUser.account = newAccount;
        newUser.roles = [userRole];
        newUser.fullName = fullname;
        this.logger.verbose(newUser);
        const createdUser = await manager.save(newUser);
        this.logger.verbose(createdUser.id);
        return this.login({
          username,
          user: {
            userId: createdUser.id,
            email,
            fullname,
          },
        });
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
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expiresIn};SameSite=None; Secure`;
  }
}
