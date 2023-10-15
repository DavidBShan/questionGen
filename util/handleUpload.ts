import { handleDailyStreak } from "./handleDailyStreak";

export const handleFileUpload = async (file: File | null, setState: (state: string) => void, setPdfText: (text: string | null) => void, userId: any, setDailyStreak:any) => {
  if (!file) {console.log("Can't find file"); return;}
  setState('loading');
  handleDailyStreak(userId, setDailyStreak);
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await fetch("/api/uploadPDF", {
      method: "POST",
      body: formData,
    });
    const body = await response.json();
    console.log(body);
    if (body.success) {
      console.log("Data added successfully");
    }
    const questionResponse = await fetch('/api/writeQuestion', {
      method: 'POST',
    });
    const questionBody = await questionResponse.json();
    console.log(questionBody);
  } catch (error) {
    console.error(error);
  } finally {
    setState('finished');
  }
};
