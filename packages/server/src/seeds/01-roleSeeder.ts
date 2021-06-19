import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import Role from '../modules/role/model';

export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([
        { name: 'ADMIN', createdBy: 'system', updatedBy: 'system' },
        { name: 'USER', createdBy: 'system', updatedBy: 'system' },
        { name: 'SUPPORTER', createdBy: 'system', updatedBy: 'system' },
        { name: 'MOD', createdBy: 'system', updatedBy: 'system' },
      ])
      .execute();
  }
}
