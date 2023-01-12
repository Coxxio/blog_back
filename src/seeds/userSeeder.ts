import { Seeder, Factory } from "typeorm-seeding";
import { DataSource } from "typeorm";
import { UserEntity } from "../entities/UserEntity";
import { hashSync } from "bcryptjs";

export default class UserSeeder implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<any> {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([
        {
          email: "admin@wingsoft.com",
          password: hashSync("1234567890", 10),
        },
        {
          email: "admin2@wingsoft.com",
          password: await hashSync("1234567890", 10),
        },
      ]).execute();
  }
}
