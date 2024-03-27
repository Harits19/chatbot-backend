import { IChatbotStep } from "../model/chatbot-model";

export const unrecognizedStepMessage: Readonly<IChatbotStep> = {
  body: "Unrecognized message",
  responseType: "free_text",
};
