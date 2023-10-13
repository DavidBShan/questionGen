import axios from 'axios'; // Import Axios

import { handleDailyStreak } from "./handleDailyStreak";

export const handleFileUpload = async (file: File | null, setState: (state: string) => void, setPdfText: (text: string | null) => void, userId: any, setDailyStreak:any) => {
  if (!file) return;
  setState('loading');
  handleDailyStreak(userId, setDailyStreak);
  const formData = new FormData();
  formData.append('pdf', file);

  try {
    const pdfParseResponse = await axios.post('/api/pdfParse', formData);
    if (pdfParseResponse.status !== 200) {
      throw new Error(`API call to pdfparse failed with status ${pdfParseResponse.status}`);
    }
    //const pdfParseData = pdfParseResponse.data;
    const updatedText = pdfParseResponse;
    console.log(updatedText);
    const writeResponse = await axios.post('/api/writeQuestion', { text: updatedText });
  } catch (error) {
    console.error(error);
  } finally {
    setState('finished');
  }
};
