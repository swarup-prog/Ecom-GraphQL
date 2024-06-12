import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: "GqLearn",
  user: "postgres",
  password: "swarup",
  host: "localhost",
  port: 5432,
});

export default sequelize;
