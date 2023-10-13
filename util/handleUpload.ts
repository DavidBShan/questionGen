import axios from 'axios';
import fs from 'fs';
import pdf from 'pdf-parse';
import { handleDailyStreak } from './handleDailyStreak';// Import pdf-parse library

export const handleFileUpload = async (file: File | null, setState: (state: string) => void, setPdfText: (text: string | null) => void, userId: any, setDailyStreak: any) => {
  if (!file) return;
  setState('loading');
  handleDailyStreak(userId, setDailyStreak);
  try {
    const dataBuffer = await file.arrayBuffer();
    const data = Buffer.from(new Uint8Array(dataBuffer));
    const pdfData = await pdf(data);

    if (!pdfData.text) {
      throw new Error('Failed to extract text from the PDF');
    }

    // Get the extracted text
    const extractedText = pdfData.text;
    console.log(extractedText);

    // Now you have the extracted text in the `extractedText` variable.

    // You can do further processing with the text or send it to the server if needed.

    // Example of sending the text to the server:
    const writeResponse = await axios.post('/api/writeQuestion', { text: extractedText });
    setPdfText(extractedText);
  } catch (error) {
    console.error(error);
  } finally {
    setState('finished');
  }
};
