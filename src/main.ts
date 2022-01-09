import "reflect-metadata";
import express, { Request, Response } from "express";
import { ConnectionOptions, createConnection, getRepository } from "typeorm";

import ormConfig from "../ormconfig";
import { User, Post } from "./db/entities";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response): Response => {
  return res.json({ message: "TypeORM Seeding Example 🌱" });
});

app.get("/posts", async (req: Request, res: Response): Promise<Response> => {
  const result: Post[] = await getRepository(Post).find({
    relations: ["user"],
  });

  return res.json(result);
});

app.get("/users/posts", async (req: Request, res: Response): Promise<Response> => {
  const result: User[] = await getRepository(User).find({
    relations: ["posts"],
  });

  return res.json(result);
});

const start = async (port: number, host = "localhost"): Promise<void> => {
  try {
    await createConnection(ormConfig as ConnectionOptions);
    app.listen(port, host, () => {
      console.log(`[SERVER] Message: Process started successfully, Host: ${host}, Port: ${port}`);
      console.log(`[ROUTE] Resume: Get all the posts and the users who wrote them, Endpoint: http://${host}:${port}/posts`);
      console.log(`[ROUTE] Resume: Get all the users and all their posts, Endpoint: http://${host}:${port}/users/posts`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start(3000);
