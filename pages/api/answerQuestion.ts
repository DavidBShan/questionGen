import { Pinecone } from "@pinecone-database/pinecone";      
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from "langchain/llms/openai";
import { VectorDBQAChain } from "langchain/chains";
import { StreamingTextResponse, LangChainStream } from "ai";
import { CallbackManager } from "langchain/callbacks";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method === 'POST') {
    const body = req.body;
    const { stream, handlers } = LangChainStream();
    const pinecone = new Pinecone({      
      environment: "gcp-starter",      
      apiKey: process.env.PINECONE_API_KEY as string,   
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
    chain.call({ query: body.prompt }).catch(console.error);
    res.status(200).json({response:new StreamingTextResponse(stream)});
  }
};
