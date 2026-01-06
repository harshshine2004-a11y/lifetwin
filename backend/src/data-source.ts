import "reflect-metadata";
import { DataSource } from "typeorm";
import { Message } from "./entity/Message";

const url = process.env.AZURE_SQL_CONNECTION || undefined;

const dataSourceOptions: any = {
  type: "mssql",
  entities: [Message],
  synchronize: true, // for development; consider migrations for production
  logging: false,
  options: {
    encrypt: true,
    enableArithAbort: true
  }
};

if (url) {
  dataSourceOptions.url = url;
} else {
  dataSourceOptions.host = process.env.AZURE_SQL_HOST;
  dataSourceOptions.port = parseInt(process.env.AZURE_SQL_PORT || "1433");
  dataSourceOptions.username = process.env.AZURE_SQL_USER;
  dataSourceOptions.password = process.env.AZURE_SQL_PASSWORD;
  dataSourceOptions.database = process.env.AZURE_SQL_DATABASE;
}

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
