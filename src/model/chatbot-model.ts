export interface ChatbotModel {
  _id?: string;
  botNumber: string;
  trigger: string[];
  steps: IChatbotStep[];
}

export interface IChatbotStep {
  id: number;
  body: string;
  option?: {
    index: number;
    text: string;
    nextStep?: number;
  }[];
}

export class ChatbotStep implements IChatbotStep {
  id: number;
  body: string;
  option?:
    | { index: number; text: string; nextStep?: number | undefined }[]
    | undefined;

  constructor(params: IChatbotStep) {
    this.id = params.id;
    this.body = params.body;
    this.option = params.option;
  }

  get format() {
    console.log("parseMessage");

    const body = `${this.body}${this.formatOption}`;

    return body;
  }

  private get formatOption() {
    if (!this.option) return "";

    return `\n\n${this.option
      .map((item) => ` - ${item.index} *${item.text}*  `)
      .join("\n")}\n\nSilahkan pilih opsi dengan angka yang tertera`;
  }
}

export const dummyRepo: ChatbotModel[] = [
  {
    botNumber: "6283840493135@c.us",
    trigger: ["test chatbot"],
    steps: [
      {
        id: 0,
        body: "response chatbot ",
        option: [
          {
            index: 1,
            text: "Option A",
            nextStep: 1,
          },
          {
            index: 2,
            text: "Option B",
            nextStep: 2,
          },
          {
            index: 3,
            text: "Option C",
            nextStep: 3,
          },
        ],
      },
      {
        id: 1,
        body: "response from Option A",
      },
      {
        id: 2,
        body: "response from Option B",
      },
      {
        id: 3,
        body: "response from Option C",
      },
    ],
  },
];
