import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import Role from '../modules/role/model';

export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.transaction(async (manager) => {
      const roleRepository = manager.getRepository(Role);
      await roleRepository.insert([
        {
          name: 'ADMIN',
        },
        {
          name: 'USER',
        },
        {
          name: 'SUPPORTER',
        },
        {
          name: 'MOD',
        },
      ]);
    });
  }
}
