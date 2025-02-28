import { GoogleGenerativeAI } from '@google/generative-ai';
import config from "../../config.js";
import { queries } from '../constants/queries';
import { OpenAI } from 'openai';

enum LLM_MODEL {
    GEMINI = "GEMINI",
    DEEP_SEEK = "DEEP_SEEK"
}

export class GenerateService {
    private model: any;
    private llmModel: LLM_MODEL;
    private openai: any;

    constructor(llmModel: string) {

        this.llmModel = LLM_MODEL[llmModel as keyof typeof LLM_MODEL];
        const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
        this.model = genAI.getGenerativeModel({model: config.GEMINI_API_MODEL});

        this.openai = new OpenAI({
            apiKey: config.DEEPSEEK_API_KEY, // Replace with your actual API key
            baseURL: config.DEEPSEEK_BASE_URL, // Set DeepSeek API base
            dangerouslyAllowBrowser: true, // Allow browser
          });
    }

    public async startChat(): Promise<string> {
        if (this.llmModel === LLM_MODEL.DEEP_SEEK) {
            const response = await this.startDSChat().then((response) => {
                return response;
            });
            return response
        } else {
            const response = await this.startGeminiChat().then((response) => {
                return response;
            });
            return response
        }
    }

    public async sendChat(context: string, inputValue: string): Promise<string> {
        if (this.llmModel === LLM_MODEL.DEEP_SEEK) {
            const response = await this.sendDSChat(context, inputValue).then((response) => {
                return response;
            });
    
            return response;
        } else {
            const response = await this.sendGemeniChat(context, inputValue).then((response) => {
                return response;
            });
    
            return response;
        }
    }

    public async startGeminiChat(): Promise<string> {
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

    public async sendGemeniChat(context: string, inputValue: string): Promise<string> {
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

    public async startDSChat(): Promise<string> {
        const template = queries.initiateChat;

        var result = "ERROR2";
        await this.queryDS(template).then((response) => {
            result = response.response.candidates[0].content.parts[0].text;
        })
        .catch((error) => {
            console.error("Error generating schedule: ", error);
            result=error
        });

        return result;
    }

    public async sendDSChat(context: string, inputValue: string): Promise<string> {
        const template = "these are you instructions: " + queries.initiateChat + "this is the conversation so far: " + context + "\n" + inputValue + "\n";
        return await this.queryDS(template).then((response) => {
            const message = response.response.candidates[0].content.parts[0].text;
            return message;
        })
        .catch((error) => {
            return Promise.reject(error);
        });
    }

    public async queryDS(inputValue: string) {
        const completion = await this.openai.chat.completions.create({
            messages: [{ role: "system", content: inputValue }],
            model: "deepseek-chat",
          });

        return completion.choices[0].message.content
    }
}