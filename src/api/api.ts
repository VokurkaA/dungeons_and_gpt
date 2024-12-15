import Groq from "groq-sdk";
import systemPrompt from "./systemPrompt.json";
import {dataFormat} from './../dataFormat';

const groq = new Groq({ apiKey: import.meta.env.VITE_AI_API_KEY, dangerouslyAllowBrowser: true });

async function callAPI(userInput: string): Promise<typeof dataFormat> {

  for(let i = 0; i < 5; i++) {
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemPrompt["1"],
          },
          {
            role: "user",
          content: userInput,
        },
      ],
        model: "llama-3.1-70b-versatile",
      });
      // Check json validity
      return JSON.parse(completion.choices[0].message.content || '');
    } 
    catch(error) {console.log(error);}
  }
  throw new Error('Failed to generate response');
}

export default callAPI;