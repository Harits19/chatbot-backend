import express, { Express, Request, Response } from "express";
import { whatsappClient } from "./src/whatsapp-client";
import { mongoClient } from "./src/mongo-client";
import dotenv from "dotenv";
import { ENV } from "./src/env-constant";

export class Main {
  app = express();
  port = process.env.PORT || 3000;

  constructor() {
    this.init();
  }

  init() {
    console.log("init application");

    whatsappClient.listenClient();

    console.log(ENV.MONGO_CLIENT);

    mongoClient.init();

    this.app.get("/ping", (req: Request, res: Response) => {
      res.send("pong");
    });

    this.app.listen(this.port, () => {
      console.log(
        `[server]: Server is running at http://localhost:${this.port}`
      );
    });
  }
}
new Main();
