import WAWebJS from "whatsapp-web.js";

export interface SessionMessage {
  type: "inbound" | "outbound";
  response: WAWebJS.Message;
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
