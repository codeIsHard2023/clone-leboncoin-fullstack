import { DataSource } from "typeorm";

export const datasource = new DataSource({
  type: "postgres",
  host: "db", // something like dnc that referencing physical adresse (can find in compose => services)
  port: 5432,
  username: "thegoodcorner",
  password: "secretcorner",
  database: "thegoodcorner",
  entities: ["./src/entities/*.ts"],
  synchronize: true,
  logging: true,
});
