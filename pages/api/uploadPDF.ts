import { IncomingForm } from 'formidable';
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import type { NextApiRequest, NextApiResponse } from 'next';
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const form = new IncomingForm();
      let pdfLoader = new PDFLoader("public/default");
      let file = null;
      form.parse(req, async (err, fields, files) => {
        console.log("Yeet")
        if (err) {
          throw new Error('Form parsing error: ' + err.message);
        }
        if (!files.file) {
          throw new Error('PDF file not found in formData');
        }else{
          console.log("Yeet")
          file = files.file[0];
          console.log(file.filepath);
          pdfLoader = new PDFLoader(file.filepath);
        }
      });
      const splitDocuments = await pdfLoader.loadAndSplit();
      const pinecone = new Pinecone({
        environment: "gcp-starter",
        apiKey: process.env.NEXT_PINECONE_API_KEY as string,
      });
      const pineconeIndex = pinecone.Index("quiz-generator");
      await PineconeStore.fromDocuments(splitDocuments, new OpenAIEmbeddings(), { pineconeIndex });
      return res.status(200).json({ message: 'Success' });
    } catch (error: any) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'An error occurred during processing' });
    }
}
