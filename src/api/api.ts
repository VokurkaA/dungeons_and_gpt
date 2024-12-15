import Groq from "groq-sdk";
import systemPrompt from "./systemPrompt.json";
import { gameState } from "../dataFormats/gameState";
import { updateData } from "../db/db";

const groq = new Groq({ apiKey: import.meta.env.VITE_AI_API_KEY, dangerouslyAllowBrowser: true });

async function callAPI(userInput: string, firstMessage: boolean): Promise<typeof gameState> {

  const messages = await createMessages(userInput, firstMessage);

  for (let i = 0; i < 5; i++) {
    try {

      // API request
      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: messages
      });

      // JSON validation
      const json = JSON.parse(completion.choices[0].message.content || "");
      if (!json.story || !json.player) {
        throw new Error("Invalid JSON format from AI");
      }

      // Creating previous messages array
      const previousMessages: string[] = [];
      messages.forEach((message: Groq.Chat.Completions.ChatCompletionMessageParam) => {
        if (typeof message.content === "string") {
          previousMessages.push(message.content);
        }
        else{
          console.error("Message content is not a string:", message.content);
        }
      });

      // Updating DB
      updateData(previousMessages, json.story, json.player.health, json.player.inventory, json.player.equipped_weapon);      

      return json;
    } catch {
      console.error("Bad JSON at iteration: ", i);
    }
  }

  throw new Error("Failed to generate response");
}
async function createMessages(userInput: string, firstMessage: boolean) {

  const messages: Groq.Chat.Completions.ChatCompletionMessageParam[] = [];

  let previousMessages = { story: [], player: { health: 0, inventory: [], equipped_weapon: "" } };

  
  if (!firstMessage) {
    previousMessages = await (await fetch("http://localhost:3000/me")).json();

    let playersRound = true;
    let i = 0;
    previousMessages.story.forEach((message: string) => {
      if(i === 0) {
        messages.push({ role: "system", content: message });
        i++;
      }
      else if (playersRound) {
        messages.push({ role: "user", content: message });
        playersRound = false;
      } else {
        messages.push({ role: "assistant", content: message });
        playersRound = true;
      }
    });
  }
  else{
    // Add system prompt to start of the messages array
    messages.push({ role: "system", content: systemPrompt["1"] });
  }
  messages.push({ role: "user", content: userInput });

  return messages;

}




export default callAPI;
