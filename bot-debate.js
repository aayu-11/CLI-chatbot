import openai from "./config/openai.js";
import gemini from "./config/gemini.js";
import colors from "colors";

const DEBATE_TOPIC = "Should artificial intelligence be regulated?";
const MAX_ROUNDS = 3;
const MAX_TOKENS_PER_RESPONSE = 100;

// System prompts for each AI
const GPT_SYSTEM_PROMPT = `You are participating in a debate about ${DEBATE_TOPIC}. 
You are taking the PRO position. Keep your responses concise (max ${MAX_TOKENS_PER_RESPONSE} tokens).
Focus on one strong argument at a time. Be respectful but persuasive.`;

const GEMINI_SYSTEM_PROMPT = `You are participating in a debate about ${DEBATE_TOPIC}. 
You are taking the CON position. Keep your responses concise (max ${MAX_TOKENS_PER_RESPONSE} tokens).
Focus on one strong argument at a time. Be respectful but persuasive.
IMPORTANT: Provide only ONE response at a time. Do not repeat your opening statement.
Do not use markdown formatting or multiple responses. Keep it simple and direct.`;

async function getGPTResponse(messages) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: messages,
    max_tokens: MAX_TOKENS_PER_RESPONSE,
    temperature: 0.7,
  });
  return response.choices[0].message.content;
}

async function getGeminiResponse(prompt) {
  const response = await gemini.models.generateContent({
    model: "gemini-1.5-flash",
    contents: prompt,
  });
  return response.text;
}

async function debate() {
  console.log(colors.bold.cyan("\n=== AI Debate ==="));
  console.log(colors.bold.yellow(`Topic: ${DEBATE_TOPIC}\n`));

  let gptMessages = [
    { role: "system", content: GPT_SYSTEM_PROMPT },
    { role: "user", content: "Start the debate with your opening statement." },
  ];

  let geminiContext =
    GEMINI_SYSTEM_PROMPT + "\n\nStart the debate with your opening statement.";

  for (let round = 1; round <= MAX_ROUNDS; round++) {
    console.log(colors.bold.green(`\nRound ${round}`));

    // GPT's turn
    const gptResponse = await getGPTResponse(gptMessages);
    console.log(colors.cyan("\nGPT-4 (PRO):"));
    console.log(colors.white(gptResponse));

    // Add GPT's response to Gemini's context
    geminiContext += `\n\nOpponent's argument: ${gptResponse}\n\nYour response:`;

    // Gemini's turn
    const geminiResponse = await getGeminiResponse(geminiContext);
    console.log(colors.magenta("\nGemini (CON):"));
    console.log(colors.white(geminiResponse));

    // Add Gemini's response to GPT's context
    gptMessages.push({ role: "assistant", content: gptResponse });
    gptMessages.push({
      role: "user",
      content: `Opponent's argument: ${geminiResponse}\n\nYour response:`,
    });
  }

  console.log(colors.bold.cyan("\n=== Debate Concluded ===\n"));
}

export default debate;
