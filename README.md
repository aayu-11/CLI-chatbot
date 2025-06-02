# CLI Chatbot with OpenAI

A command-line interface chatbot built using Node.js and OpenAI's GPT-4 API. This chatbot maintains conversation context and provides interactive responses in a colorful terminal interface.

## Features

- Interactive command-line interface
- Maintains conversation context
- Colored terminal output for better readability
- Error handling and input validation
- Configurable AI parameters (temperature, tokens, etc.)

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- OpenAI API key

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:

```env
OPENAI_API_KEY=your_api_key_here
```

## Project Structure

```
.
├── config/
│   └── openai.js      # OpenAI configuration
├── index.js           # Main application file
├── package.json       # Project dependencies
├── .env              # Environment variables (not tracked in git)
└── README.md         # This file
```

## Usage

1. Start the chatbot:

```bash
node index.js
```

2. Type your questions or messages after the "You:" prompt
3. Type 'exit' to quit the chatbot

## Configuration

The chatbot can be configured by modifying the following parameters in `index.js`:

- `model`: The OpenAI model to use (default: "gpt-4")
- `temperature`: Controls response randomness (0-2)
- `max_tokens`: Maximum length of response
- `top_p`: Controls response diversity
- `frequency_penalty`: Reduces repetition
- `presence_penalty`: Encourages new topics

## Dependencies

- `openai`: OpenAI API client
- `dotenv`: Environment variable management
- `readline-sync`: Synchronous readline interface
- `colors`: Terminal text coloring

## Error Handling

The chatbot includes error handling for:

- Invalid API responses
- Empty user input
- API connection issues

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for providing the GPT-4 API
- The Node.js community for the excellent packages used in this project
