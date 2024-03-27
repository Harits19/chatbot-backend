import { mongoClient } from "../client/mongo-client";
import {
  SessionMessage,
  SessionModel,
  sanitizedMessage,
} from "../model/session-model";
import { uid } from "../util/string-util";

export class SessionRepo {
  db = mongoClient.db("chatbot");
  collection = this.db.collection<SessionModel>("chatbot-session");

  findSession = async (from: string, botNumber: string) => {
    const resultSession = await this.collection.findOne({
      from,
      botNumber,
      finishedAt: {
        $eq: undefined,
      },
    });
    console.log("result", resultSession);
    return resultSession ?? undefined;
  };

  createSession = async (
    from: string,
    botNumber: string,
    flowId: string,
    message: SessionMessage[]
  ) => {
    const newSession: SessionModel = {
      _id: uid(),
      botNumber,
      from,
      flowId,
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: message,
    };
    await this.collection.insertOne(newSession);
  };

  replaceSession = async (session: SessionModel) => {
    await this.collection.findOneAndReplace({ _id: session._id }, session);
  };
}

export const sessionRepo = new SessionRepo();
