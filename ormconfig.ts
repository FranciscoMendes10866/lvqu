import { User, Post } from "./src/db/entities";

export default {
  name: "default",
  type: "sqlite",
  database: "src/db/dev.db",
  entities: [User, Post],
  synchronize: true,
  logging: false,
  seeds: ["src/db/seeding/seeds/**/*{.ts,.js}"],
  factories: ["src/db/seeding/factories/**/*{.ts,.js}"],
};
