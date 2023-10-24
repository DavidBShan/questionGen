import { handleDailyStreak } from "./handleDailyStreak";
import { toast } from "react-hot-toast";

export const handleFileUpload = async (file: File | null, setState: (state: string) => void,  userId: any, setDailyStreak:any, setData:any, setPdfText: any) => {
  if (!file) return;
  setState('loading');
  console.log(userId);
  //handleDailyStreak(userId, setDailyStreak);
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
    setPdfText(pdfParseData);
    const writeResponse = await fetch('/api/writeQuestion', {
      method: 'POST',
      body: JSON.stringify({ text: pdfParseData })
    });
    
    if (writeResponse.status !== 200) {
      const errorText = await writeResponse.text();

      if (errorText.includes("Please reduce the length of the messages.")) {
        toast.error("The PDF file is too long!");
        } else {
          throw new Error(`API call failed with status ${writeResponse.status}`);
        } 
    }

    const writeData = await writeResponse.json();
    console.log(writeData);
    console.log(JSON.parse(writeData.questions));
    const questions = JSON.parse(writeData.questions);
    console.log(questions[0]);
    setData(questions);
    setState('finished');
  } catch (error) {
    setState('nothing');
    console.error(error);
    toast.error("There was an error generating your quiz!");
  } 
};
