import openai from "./config/openai.js";
import readlineSync from "readline-sync";
import colors from "colors";
import debate from "./bot-debate.js";

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

      // Create a stream
      const stream = await openai.chat.completions.create({
        model: "gpt-4",
        messages: chatHistory,
        temperature: 0.7,
        max_tokens: 50,
        top_p: 0.9,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
        stream: true, // Enable streaming
      });

      // Initialize an empty string to collect the full response
      let fullResponse = "";
      process.stdout.write(colors.green("Bot: "));

      // Handle the stream
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          process.stdout.write(content);
          fullResponse += content;
        }
      }
      console.log(); // Add a newline after the response

      // Add assistant's response to chat history
      chatHistory.push({
        role: "assistant",
        content: fullResponse,
      });
    } catch (error) {
      console.error(colors.red("Error: "), error.message);
      continue;
    }
  }
}

// main();

debate().catch(console.error);
