import { SessionMessage } from "./../model/session-model";
import WAWebJS, { Buttons, MessageTypes } from "whatsapp-web.js";
import { whatsappClient } from "../client/whatsapp-client";
import { chatbotRepo } from "../repo/chatbot-repo";
import { ChatbotStep } from "../model/chatbot-model";
import { sessionRepo } from "../repo/session-repo";
import { unrecognizedStepMessage } from "../constan/chatbot-constan";

export class ChatbotService {
  onReceiveMessage = async (triggerMessage: WAWebJS.Message) => {
    console.log(JSON.stringify(triggerMessage));
    try {
      const { body, to: botNumber, from: senderNumber } = triggerMessage;

      console.log({ senderNumber, botNumber, body });

      const activeSession = await sessionRepo.findSession(
        senderNumber,
        botNumber
      );

      if (activeSession) {
        console.log(senderNumber, " have session");

        const lastOutbound = activeSession.messages
          .reverse()
          .find((item) => item.type === "outbound");

        if (!lastOutbound) {
          console.warn("last outbound message outbound undefined");
          return;
        }
        const lastQuestion = lastOutbound?.question;

        if (lastQuestion?.responseType == "body_option") {
          if (!lastQuestion) {
            console.error(`question undefined on`, lastOutbound);
            return;
          }

          if (!lastQuestion.option || lastQuestion.option.length == 0) {
            console.error(`option is empty on`, lastOutbound);
            return;
          }

          const selectedOption = lastQuestion.option.find(
            (item) => item.key === triggerMessage.body
          );
          console.log({ selectedOption });

          if (!selectedOption) {
            const resultUnrecognized: SessionMessage = {
              type: "outbound",
              response: await whatsappClient.sendMessageStep(
                senderNumber,
                unrecognizedStepMessage
              ),
            };

            const resultLastQuestion: SessionMessage = {
              type: "outbound",
              question: lastQuestion,
              response: await whatsappClient.sendMessageStep(
                senderNumber,
                lastQuestion
              ),
            };
            activeSession.messages.push(
              ...[resultUnrecognized, resultLastQuestion]
            );
            return;
          }
        }
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

        const nextMessage = await whatsappClient.sendMessageStep(
          senderNumber,
          steps
        );
        await sessionRepo.createSession(senderNumber, botNumber, [
          {
            type: "inbound",
            response: triggerMessage,
          },
          {
            type: "outbound",
            question: steps,
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
