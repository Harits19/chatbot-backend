import WAWebJS from "whatsapp-web.js";
import { whatsappClient } from "../client/whatsapp-client";
import { chatbotRepo } from "../repo/chatbot-repo";
import { ChatbotStep } from "../model/chatbot-model";
import { sessionRepo } from "../repo/session-repo";

export class ChatbotService {
  onReceiveMessage = async (triggerMessage: WAWebJS.Message) => {
    try {
      const { body, to: botNumber, from: senderNumber } = triggerMessage;

      console.log({ senderNumber, botNumber, body });

      const activeSession = await sessionRepo.isNumberHaveSession(
        senderNumber,
        botNumber
      );

      if (activeSession) {
        console.log(senderNumber, " have session");
      } else {
        console.log(senderNumber, " don't have session");

        const selectedChatbot = chatbotRepo.findChatbotByTrigger(
          body,
          botNumber
        );
        if (!selectedChatbot) {
          console.log("chatbot config not found on number ", botNumber);
          return;
        }

        const steps = selectedChatbot.steps.at(0);

        if (!steps) {
          console.error(
            "step is undefined on config with id ",
            selectedChatbot._id,
            selectedChatbot.botNumber
          );
          return;
        }

        const stepMessage = new ChatbotStep(steps);

        const nextMessage = await whatsappClient.sendMessage(
          senderNumber,
          stepMessage.format
        );
        await sessionRepo.createSession(senderNumber, botNumber, [
          {
            type: "inbound",
            response: triggerMessage,
          },
          {
            type: "outbound",
            response: nextMessage,
          },
        ]);
      }
    } catch (error) {
      console.error("onReceiveMessage error", error);
    }
  };

  createSession = async () => {};
}

export const chatbotService = new ChatbotService();
