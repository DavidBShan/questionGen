import axios from 'axios'; // Import Axios

import { handleDailyStreak } from "./handleDailyStreak";

export const handleFileUpload = async (file: File | null, setState: (state: string) => void, setPdfText: (text: string | null) => void, userId: any, setDailyStreak:any) => {
  if (!file) return;
  setState('loading');
  handleDailyStreak(userId, setDailyStreak);
  const formData = new FormData();
  formData.append('pdf', file);

  try {
    // Replace fetch with Axios for the following requests
    const uploadResponse = await axios.post('/api/uploadPDF', formData);
    if (uploadResponse.status !== 200) {
      throw new Error(`API call failed with status ${uploadResponse.status}`);
    }
    const pdfParseResponse = await axios.post('/api/pdfParse');
    if (pdfParseResponse.status !== 200) {
      throw new Error(`API call to pdfparse failed with status ${pdfParseResponse.status}`);
    }
    const pdfParseData = pdfParseResponse.data;
    const updatedText = pdfParseData.txt;
    const writeResponse = await axios.post('/api/writeQuestion', { text: updatedText });
  } catch (error) {
    console.error(error);
  } finally {
    setState('finished');
  }
};
