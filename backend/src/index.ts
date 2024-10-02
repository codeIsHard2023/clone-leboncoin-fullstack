import "reflect-metadata";
import express from "express";
import cors from "cors";
import { datasource } from "./datasource";
import { router as adRouter } from "./Controllers/adController";
import { router as categoryRouter } from "./Controllers/categoryController";
import { router as tagController } from "./Controllers/tagController";

const app = express();

const port: number = 3000;
const portClient: number = 5173;

app.use(express.json());

app.use(
  cors({
    origin: `http://localhost:${portClient}`,
  })
);

app.use("/api/ads", adRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/tags", tagController);

async function initialize() {
  await datasource.initialize(); // wait connection to db before server start
  console.log("Datasource is connected");

  app.listen(port, () => {
    console.log(`Listen on port ${port}`);
  });
}

initialize();
