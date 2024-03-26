import { Client } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

export class WhatsappClient {
  listenClient() {
    console.log("start listen client");

    // Create a new client instance
    const client = new Client({});

    // When the client is ready, run this code (only once)
    client.once("ready", () => {
      console.log("Client is ready!");
    });

    // When the client received QR-Code
    client.on("qr", (qr) => {
      console.log("QR RECEIVED", qr);
      qrcode.generate(qr, { small: true });
    });

    client.on("message_create", (message) => {
      if (message.body === "ping") {
        // send back "pong" to the chat the message was sent in
        client.sendMessage(message.from, "pong");
      }
    });

    // Start your client
    client.initialize();
  }
}

export const whatsappClient = new WhatsappClient();
