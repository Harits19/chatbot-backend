import WAWebJS from "whatsapp-web.js";
import { ChatbotOption, IChatbotStep } from "./chatbot-model";

export interface SessionResponse
  extends Pick<WAWebJS.Message, "body" | "type"> {}

export interface SessionMessage {
  type: "inbound" | "outbound";
  response: SessionResponse;
  question?: IChatbotStep;
}

export interface SessionModel {
  _id: string;
  from: string;
  botNumber: string;
  createdAt: Date;
  updatedAt: Date;
  finishedAt?: Date;
  messages: SessionMessage[];
}

export const sanitizedMessage = (
  response: WAWebJS.Message
): SessionResponse => {
  return {
    body: response.body,
    type: response.type,
  };
};
