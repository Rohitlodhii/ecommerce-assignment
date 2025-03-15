import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-2.0-flash",
  temperature: 0, // Ensures structured output
});





export async function gemini_json(user_prompt : string , formatInstructions : string) {
  try {
    const parser = new JsonOutputParser();

    const prompt = ChatPromptTemplate.fromTemplate(
        "\n{query}\n{format_instructions}",
    )

    const partialedPrompt = await prompt.partial({
        format_instructions: formatInstructions,
      });
      
      const chain = partialedPrompt.pipe(model).pipe(parser);
      const response = await chain.invoke({ query: user_prompt });;

      console.log(response)
    return response;

  } catch (error) {
    console.error("Error parsing AI response:", error);
    return null;
  }
}
