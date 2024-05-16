import { Sequelize } from "sequelize"
interface DB {
  database: string
  host: string
  port: number
  username: string
  password: string
}

const config: DB = {
  database: process.env.PG_DATABASE as string,
  host: process.env.PG_HOST as string,
  port: 5432,
  username: process.env.PG_USER as string,
  password: process.env.PG_PASSWORD as string
}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: 'postgres'
  }
)

export default sequelize
