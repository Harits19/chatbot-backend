import WAWebJS from "whatsapp-web.js";
import { whatsappClient } from "../client/whatsapp-client";
import { chatbotRepo } from "../repo/chatbot-repo";
import { ChatbotStep } from "../model/chatbot-model";

export class ChatbotService {
  onReceiveMessage(message: WAWebJS.Message) {
    try {
      console.log("receive message", message.body);
      const selectedChatbot = chatbotRepo.findChatbotByTrigger(
        message.body,
        message.from
      );
      if (!selectedChatbot) return;

      const steps = selectedChatbot.steps.at(0);

      if (!steps) return;

      const nextMessage = new ChatbotStep(steps);

      whatsappClient.sendMessage(message.from, nextMessage.format);
    } catch (error) {
      console.error("onReceiveMessage error", error);
    }
  }
}

export const chatbotService = new ChatbotService();
