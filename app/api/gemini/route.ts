import {  Message, streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { initialMessage } from "@/lib/data";

const google = createGoogleGenerativeAI({ //initialize Google Generative AI client
  apiKey: process.env.GOOGLE_API_KEY || "",
  apiVersion: "v1",
});

export const runtime = "edge"; //specify edge runtime for serverless deployment (web-standard apis)

const generateId = () => Math.random().toString(36).slice(2, 15); //tag each message with a unique identifier (useful for tracking).


const buildGoogleGenAIPrompt = (messages: Message[]): Message[] => [
  {
    id: generateId(),
    role: "user",
    content: initialMessage.content,
  },
  ...messages.map((message) => ({
    id: message.id || generateId(),
    role: message.role,
    content: message.content,
  })),
]; // The final result is a chat history array that starts with the system context, followed by all chat exchanges.

export async function POST(request: Request) {
  const { messages } = await request.json();
  const stream = await streamText({
    model: google("gemini-2.5-flash"),
    messages: buildGoogleGenAIPrompt(messages),
    temperature: 0.7,
  });
  return stream?.toDataStreamResponse();
}

/*
                            summary
Frontend sends a POST request to /api/chat with all chat messages.

Server builds a new array:

Starts with your “Axion Assistant” context.

Appends all user + assistant messages.

Calls Gemini with this array.

Streams the model’s response back as it’s generated.

Frontend receives it live and displays it. */


/* [Frontend] ---> POST /api/chat { messages }
                 |
                 V
          [Edge Function]
                 |
                 |  buildGoogleGenAIPrompt()
                 V
          [Gemini Pro API]
                 |
                 V
          [Streamed Response]
                 |
                 V
[Frontend updates chat in real time] */
