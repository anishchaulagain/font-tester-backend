import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
import { Font } from "./entities/Fonts";
import { AdminUser } from "./entities/AdminUser";


dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  migrations: ["src/migrations/*.ts"],
  entities: [Font, AdminUser],
  logging: true,
});
