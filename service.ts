import OpenAI from "openai";
import type { CHAT } from "./server/api/types";

const openaiApiKey = process.env.OPENAI_API_KEY || '';

// Log the API key to check if it's being retrieved correctly
console.log("OpenAI API Key:", openaiApiKey);

const openai = new OpenAI({
  apiKey: openaiApiKey,
  dangerouslyAllowBrowser: true,
});

export async function sendAllMessages(chats: unknown): Promise<CHAT> {
  try {
    const response = await openai.chat.completions.create({
      messages: chats as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
      model: "gpt-3.5-turbo",
    });

    console.log({ response });

    const chatGptMessage: CHAT = {
      role: response.choices[0].message.role,
      content: response.choices[0].message.content!,
    };

    return chatGptMessage;
    
  } catch (error: any) {
    console.error("Error in sendAllMessages:", error);
    throw new Error(`OpenAI API request failed: ${error.message}`);
  }
}
