import { GoogleGenerativeAI } from '@google/generative-ai';
import config from "../../config.js";
import { queries } from '../constants/queries';

export class GenerateService {
    private model: any;

    constructor() {
        const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
        this.model = genAI.getGenerativeModel({model: config.GEMINI_API_MODEL});
    }

    public async startChat(): Promise<string> {
        const template = queries.initiateChat;
            

        var result = "ERROR2";
        await this.queryGemini(template).then((response) => {
            result = response.response.candidates[0].content.parts[0].text;
        })
        .catch((error) => {
            console.error("Error generating schedule: ", error);
        });

        return result;
    };

    public async sendChat(context: string, inputValue: string): Promise<string> {
        const template = "these are you instructions: " + queries.initiateChat + "this is the conversation so far: " + context + "\n" + inputValue + "\n";
        return await this.queryGemini(template).then((response) => {
            const message = response.response.candidates[0].content.parts[0].text;
            return message;
        })
        .catch((error) => {
            return Promise.reject(error);
        });
    }

    public async queryGemini(inputValue: string) {
        const result = await this.model.generateContent(inputValue);
        return result;
      };
}