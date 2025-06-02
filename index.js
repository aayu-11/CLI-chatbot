import openai from "./config/openai.js";
import readlineSync from "readline-sync";
import colors from "colors";

async function main() {
  console.log(colors.bold.green("Welcome to the CLI Chatbot!"));
  console.log(
    colors.bold.green(
      "You can start asking questions now. Type 'exit' to quit."
    )
  );

  const chatHistory = [
    {
      role: "system",
      content:
        "You are a helpful AI assistant. Maintain context from previous messages in the conversation.",
    },
  ];

  while (true) {
    const userInput = readlineSync.question(colors.yellow("You: "));

    try {
      if (userInput.toLowerCase() === "exit") {
        break;
      }
      if (!userInput.trim()) {
        console.log(colors.red("Please enter a valid question."));
        continue;
      }

      // Add user message to chat history
      chatHistory.push({
        role: "user",
        content: userInput,
      });

      const completions = await openai.chat.completions.create({
        model: "gpt-4",
        messages: chatHistory,
        temperature: 0.7,
        max_tokens: 50,
        top_p: 0.9,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
        stream: false,
      });

      const completionText = completions.choices[0].message.content;
      console.log(colors.green("Bot: ") + completionText);

      // Add assistant's response to chat history
      chatHistory.push({
        role: "assistant",
        content: completionText,
      });
    } catch (error) {
      console.error(colors.red("Error: "), error.message);
      continue;
    }
  }
}

main();
