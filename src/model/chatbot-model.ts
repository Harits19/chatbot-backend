export interface ChatbotModel {
  _id?: string;
  botNumber: string;
  trigger: string[];
  steps: IChatbotStep[];
}

export interface ChatbotOption {
  key: string;
  text: string;
  nextStep?: number;
}

type ResponseType = "free_text" | "body_option";

export interface IChatbotStep {
  id?: number;
  body: string;
  responseType: ResponseType;
  option?: ChatbotOption[];
}

export class ChatbotStep implements IChatbotStep {
  id?: number;
  body: string;
  option?: ChatbotOption[];
  responseType: ResponseType;

  constructor(params: IChatbotStep) {
    this.id = params.id;
    this.body = params.body;
    this.option = params.option;
    this.responseType = params.responseType;
  }

  get format() {
    console.log("parseMessage");

    const body = `${this.body}${this.formatOption}`;

    return body;
  }

  private get formatOption() {
    if (!this.option) return "";

    return `\n\n${this.option
      .map((item) => ` - ${item.key} *${item.text}*  `)
      .join("\n")}\n\nSilahkan pilih opsi dengan angka yang tertera`;
  }
}

export const dummyRepo: ChatbotModel[] = [
  {
    botNumber: "628881852685@c.us",
    trigger: ["test chatbot"],
    steps: [
      {
        id: 0,
        body: "response chatbot ",
        responseType: "body_option",
        option: [
          {
            key: "1",
            text: "Option A",
            nextStep: 1,
          },
          {
            key: "2",
            text: "Option B",
            nextStep: 2,
          },
          {
            key: "3",
            text: "Option C",
            nextStep: 3,
          },
        ],
      },
      {
        id: 1,
        body: "response from Option A",
        responseType: "free_text",
      },
      {
        id: 2,
        body: "response from Option B",
        responseType: "free_text",
      },
      {
        id: 3,
        body: "response from Option C",
        responseType: "free_text",
      },
    ],
  },
];
