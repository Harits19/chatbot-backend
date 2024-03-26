import { mongoClient } from "../client/mongo-client";
import { SessionModel } from "../model/session-model";
import { uid } from "../util/string-util";

export class SessionRepo {
  db = mongoClient.db("chatbot");
  collection = this.db.collection<SessionModel>("chatbot-session");

  isNumberHaveSession = async (from: string, botNumber: string) => {
    const checkNumber = await this.collection.findOne({
      from,
      botNumber,
      finishedAt: {
        $eq: undefined,
      },
    });
    console.log("result", checkNumber);
    return checkNumber ?? undefined;
  };

  createSession = async (from: string, botNumber: string) => {
    const newSession: SessionModel = {
      _id: uid(),
      botNumber,
      from,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await this.collection.insertOne(newSession);

    console.log("result create session", result);
  };
}

export const sessionRepo = new SessionRepo();
