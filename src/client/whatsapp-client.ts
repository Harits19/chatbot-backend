import {
  Buttons,
  Client,
  ClientSession,
  LocalAuth,
  Message,
  MessageContent,
  MessageSendOptions,
  NoAuth,
} from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { chatbotService } from "../service/chatbot-service";
import { ChatbotStep, IChatbotStep } from "../model/chatbot-model";
import { SessionResponse, sanitizedMessage } from "../model/session-model";

export class WhatsappClient extends Client {
  listenClient() {
    console.log("start listen client test");
    // Create a new client instance

    // When the client is ready, run this code (only once)
    this.once("ready", () => {
      console.log("Client is ready!");
    });

    // When the client received QR-Code
    this.on("qr", (qr) => {
      console.log("QR RECEIVED", qr);
      qrcode.generate(qr, { small: true });
    });

    this.on("message", chatbotService.onReceiveMessage);

    // Start your client
    this.initialize();
  }

  async sendMessageStep(
    chatId: string,
    content: IChatbotStep,
    options?: MessageSendOptions | undefined
  ): Promise<SessionResponse> {
    const newContent = new ChatbotStep(content).format;
    const result = await this.sendMessage(chatId, newContent, options);

    const mapMessage = sanitizedMessage(result);

    return mapMessage;
  }
  
}

export const whatsappClient = new WhatsappClient({
  authStrategy: new LocalAuth(),
});
