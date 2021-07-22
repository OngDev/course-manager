import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Connection, EntityManager, Repository } from 'typeorm';
import { User } from './model';
import { UserCreationPayload } from '@modules/user/types';
import Role from '@modules/role/model';
import Account from '@modules/account/model';
import { AccountsService } from '@modules/account/service';
import { generateNewPassword, hashPassword } from '@modules/auth/utils';
import { RolesService } from '@modules/role/service';
import { MailService } from '@modules/mail/service';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) repo: Repository<User>,
    private readonly accountsService: AccountsService,
    private readonly rolesService: RolesService,
    private readonly connection: Connection,
    private readonly mailService: MailService,
    private readonly logger: Logger,
  ) {
    super(repo);
  }

  async createUserByAdmin(
    userCreationPayload: UserCreationPayload,
  ): Promise<any> {
    try {
      const { email, fullName, username, roles } = userCreationPayload;
      await this.accountsService.checkUsernameExisted(username);
      await this.checkEmailExisted(email);
      const newPassword = generateNewPassword();
      const hashedPassword = await hashPassword(newPassword);
      const rolesObject = await this.rolesService.getRolesByRolesStrArr(roles);
      await this.connection.transaction(async (manager) => {
        const newUser = await this.createUserTransaction(
          manager,
          username,
          hashedPassword,
          email,
          rolesObject,
          fullName,
        );
        await this.mailService.sendUserConfirmation(
          username,
          newPassword,
          email,
          fullName,
          roles.join(', '),
        );
        return newUser;
      });
      return null;
    } catch (e) {
      this.logger.error(e.message);
      return null;
    }
  }

  async checkEmailExisted(email: string): Promise<void> {
    const existedUser = await this.repo.findOne({
      where: { email },
    });
    if (existedUser) {
      throw new Error('Email is existed');
    }
  }

  async createUserTransaction(
    manager: EntityManager,
    username: string,
    hashedPassword: string,
    email: string,
    userRoles: Role[],
    fullName: string,
  ): Promise<User> {
    const newAccount = new Account();
    newAccount.username = username;
    newAccount.password = hashedPassword;
    this.logger.verbose(newAccount);
    await manager.save(newAccount);
    const newUser = new User();
    newUser.email = email;
    newUser.account = newAccount;
    newUser.roles = userRoles;
    newUser.fullName = fullName;
    this.logger.verbose(newUser);
    const createdUser = await manager.save(newUser);
    this.logger.verbose(createdUser.id);
    return createdUser;
  }
}
