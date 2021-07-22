import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isMatch, hashPassword } from './utils';
import { RegisterPayload, TokenPayload } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import Role from '../role/model';
import { configService } from '../../config/config.service';
import { UsersService } from '@modules/user/service';
import { AccountsService } from '@modules/account/service';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
    private readonly accountsService: AccountsService,
    private readonly usersService: UsersService,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private connection: Connection,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const account = await this.accountsService.findOne(username);
      this.logger.log(account);
      if (account && (await isMatch(pass, account.password))) {
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
      const user = await this.usersService.findOne({
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
    fullName,
    password: rawPass,
  }: RegisterPayload): Promise<any> {
    try {
      const hashedPassword = await hashPassword(rawPass);
      const userRole = await this.roleRepository.findOneOrFail({
        name: 'USER',
      });
      await this.accountsService.checkUsernameExisted(username);
      await this.usersService.checkEmailExisted(email);
      await this.connection.transaction(async (manager) => {
        const createdUser = await this.usersService.createUserTransaction(
          manager,
          username,
          hashedPassword,
          email,
          [userRole],
          fullName,
        );
        return this.login({
          username,
          user: {
            userId: createdUser.id,
            email,
            fullName,
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

  getEmptyCookie() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0;SameSite=None; Secure`;
  }
}
