import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não definida");
}

const sequelize = new Sequelize(
  process.env.DATABASE_URL ||
    "postgres://postgres:postgres@postgres:5431/bd-pedidos",
  {
    dialect: "postgres",
    logging: console.log,
  },
);

export default sequelize;
