import WAWebJS from "whatsapp-web.js";
import { whatsappClient } from "../client/whatsapp-client";

export class ChatbotService {
  onReceiveMessage(message: WAWebJS.Message) {
    try {
      console.log("receive message", message.body);
      if (message.body === "ping") {
        // send back "pong" to the chat the message was sent in
        whatsappClient.sendMessage(message.from, "pong");
      }
    } catch (error) {
      console.error("onReceiveMessage error", error);
    }
  }
}

export const chatbotService = new ChatbotService();
