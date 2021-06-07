import Account from '@modules/account/model';
import { hashPassword } from '@modules/auth/utils';
import { Admin, User } from '@modules/user/model';
import { configService } from 'src/config/config.service';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import Role from '../modules/role/model';

export default class CreateAdmin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.transaction(async (manager) => {
      const roleRepository = manager.getRepository(Role);
      const userRole = await roleRepository.findOneOrFail({
        name: 'ADMIN',
      });
      const newAccount = new Account();
      newAccount.username = 'admin';
      newAccount.password = await hashPassword(
        configService.getAdminPassword(),
      );
      await manager.save(newAccount);
      const newUser = new User();
      newUser.email = 'admin@ongdev.com';
      newUser.account = newAccount;
      newUser.roles = [userRole];
      newUser.fullName = 'Ong Dev';
      await manager.save(newUser);
      const newAdmin = new Admin();
      newAdmin.user = newUser;
      await manager.save(newAdmin);
    });
  }
}
