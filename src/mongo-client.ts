import { MongoClient as BaseMongoClient } from "mongodb";
import { ENV } from "./env-constant";

export class MongoClient extends BaseMongoClient {
  async init() {
    await this.connect();
    console.log("Connected successfully to server");
  }
}

export const mongoClient = new MongoClient(ENV.MONGO_CLIENT!);
