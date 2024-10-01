import { DataSource } from "typeorm";

export const datasource = new DataSource({
    type: "sqlite",
    database: "./db/leboncoin.sqlite",
    entities: ["./db/entities/*.ts"],
    synchronize: true,
    logging: true
})