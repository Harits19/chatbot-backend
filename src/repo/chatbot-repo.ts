import { dummyRepo } from "../model/chatbot-model";

export class ChatbotRepo {
  findChatbotByTrigger(trigger: string, botNumber: string) {
    const selectedConfig = dummyRepo.find(
      (item) => item.botNumber === botNumber
    );
    if (!selectedConfig) return;
    const isTriggerFound =
      selectedConfig.trigger.find(
        (item) => item.toLowerCase() == trigger.toLowerCase()
      ) !== undefined;

    if (isTriggerFound) return selectedConfig;
  }

  findChatbotById(id: string) {
    return dummyRepo.find((item) => item._id === id);
  }
}

export const chatbotRepo = new ChatbotRepo();
