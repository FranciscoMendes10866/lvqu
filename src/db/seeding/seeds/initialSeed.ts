import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";

import { User, Post } from "../../entities";

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const users = await factory(User)().createMany(15);

    await factory(Post)()
      .map(async (post) => {
        post.user = users[Math.floor(Math.random() * users.length)];
        return post;
      })
      .createMany(100);
  }
}
