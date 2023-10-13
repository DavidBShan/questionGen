import axios from 'axios';
import fs from 'fs';
import pdf from 'pdf-parse';
import { handleDailyStreak } from './handleDailyStreak';// Import pdf-parse library

export const handleFileUpload = async (file: File | null, setState: (state: string) => void, setPdfText: (text: string | null) => void, userId: any, setDailyStreak: any) => {
  if (!file) return;
  setState('loading');
  handleDailyStreak(userId, setDailyStreak);
    const parsedText = await axios.post('/api/pdfParse', { pdf: file });
    const extractedText = parsedText.data.text;
    const writeResponse = await axios.post('/api/writeQuestion', { text: extractedText });
    setPdfText(extractedText);
    setState('finished');
};
