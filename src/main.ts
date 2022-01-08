import "reflect-metadata";
import express, { Request, Response } from "express";
import { ConnectionOptions, createConnection, getRepository } from "typeorm";

import ormConfig from "../ormconfig";
import { Post } from "./db/entities";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response): Response => {
  return res.json({ message: "TypeORM Seeding Example 🌱" });
});

app.get("/posts", async (req: Request, res: Response): Promise<Response> => {
  const posts = await getRepository(Post).find({
    relations: ["user"],
  });

  return res.json(posts);
});

const start = async (port: number, host = "localhost"): Promise<void> => {
  try {
    await createConnection(ormConfig as ConnectionOptions);
    app.listen(port, host, () => {
      console.log(`[SERVER] Message: Process started successfully, Host: ${host}, Port: ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start(3333);
