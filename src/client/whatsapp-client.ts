import { Client, ClientSession, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { chatbotService } from "../service/chatbot-service";

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
}

export const whatsappClient = new WhatsappClient({
  authStrategy: new LocalAuth(),
});
