import Groq from "groq-sdk";
import systemPrompt from "./systemPrompt.json";

const groq = new Groq({ apiKey: import.meta.env.VITE_AI_API_KEY, dangerouslyAllowBrowser: true });

async function callAPI(userInput: string): Promise<string> {

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
    console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content || "";
  } catch (error) {
    return `Error calling API: ${error}`;
    console.error("Error calling API:", error);
  }
}

export default callAPI;