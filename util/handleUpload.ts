import { handleDailyStreak } from "./handleDailyStreak";
import { useMyContext } from "@/app/question";

export const handleFileUpload = async (file: File | null, setState: (state: string) => void,  userId: any, setDailyStreak:any, setData:any) => {
  if (!file) return;
  setState('loading');
  handleDailyStreak(userId, setDailyStreak);
  const formData = new FormData();
  formData.append('pdf', file);

  try {
    const uploadResponse = await fetch('/api/uploadPDF', {
      method: 'POST',
      body: formData,
    });
    if (uploadResponse.status !== 200) {
      throw new Error(`API call failed with status ${uploadResponse.status}`);
    }
    const pdfParseData = JSON.parse(await uploadResponse.json());
    console.log(pdfParseData)
    const writeResponse = await fetch('/api/writeQuestion', {
      method: 'POST',
      body: JSON.stringify({ text: pdfParseData })
    });
    if (writeResponse.status !== 200) {
      throw new Error(`API call failed with status ${writeResponse.status}`);
    }
    const writeData = await writeResponse.json();
    console.log(writeData);
    console.log(JSON.parse(writeData.questions));
    const questions = JSON.parse(writeData.questions);
    console.log("yo yo yo");
    console.log(questions[0]);
    setData(questions);
  } catch (error) {
    console.error(error);
  } finally {
    setState('finished');
  }
};
