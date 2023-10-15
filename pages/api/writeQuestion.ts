import { Pinecone } from "@pinecone-database/pinecone";      
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from "langchain/llms/openai";
import { VectorDBQAChain } from "langchain/chains";
import { StreamingTextResponse, LangChainStream } from "ai";
import { CallbackManager } from "langchain/callbacks";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    console.log("bruv")
    const { stream, handlers } = LangChainStream();
    console.log("yo");
    const pinecone = new Pinecone({      
      environment: "gcp-starter",      
      apiKey: process.env.NEXT_PINECONE_API_KEY as string,   
    });      
    const pineconeIndex = pinecone.Index("quiz-generator");
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings(),
      { pineconeIndex }
    );
    const model = new OpenAI({
      modelName: "gpt-3.5-turbo",
      streaming: true,
      callbackManager: CallbackManager.fromHandlers(handlers),
    });
    const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
      k: 1,
      returnSourceDocuments: true,
    });
    chain.call({ query: `You are a world-class question generator for any text the user inputs. You will generate 10 questions based on the text. Here's how you will perform in 4 steps:
          
    Step 1: You will receive the text 
    Step 2: You will generate 10 multiple choice questions with 4 choices based on the text. The questions should be specific to the text.
    Step 3: You will put the questions in a JSON object array with each object being a question.
    
    Each question object should be in the following format: 
    {question: "THE_QUESTION_YOU_GENERATE",
    options: ["OPTION_1", "OPTION_2", "OPTION_3", "OPTION_4"],
    correctAnswer: "CORRECT_OPTION"}
    
    Here is an example: 
    {
      question: "What is the capital of France?",
      options: ["Madrid", "London", "Paris", "Berlin"],
      correctAnswer: "Paris"
    }


    I want the overall format of response to be:
    [
      {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris",
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars",
      },
      // Add more 8 questions here
    ];


    No explanation is needed for the correct answer, and the options should be shuffled. 
    Step 4: You will return the JSON array to the user with no additional explanation IMPORTANT: I JUST WANT AN ARRAY OF QUESTIONS. NO EXPLANATION OR ADDITIONAL INFORMATION IS NEEDED
    `}).catch(console.error);
    res.status(200).json({response:new StreamingTextResponse(stream)});
};
