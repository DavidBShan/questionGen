import { handleDailyStreak } from "./handleDailyStreak";
export const handleFileUpload = async (
  file: File | null,
  setState: (state: string) => void,
  setPdfText: (text: string | null) => void,
  userId: any,
  setDailyStreak: any
) => {
  if (!file) return;
  setState('loading');
  handleDailyStreak(userId, setDailyStreak);
  const formData = new FormData();
  formData.append('pdf', file);

  try {
    // Make an API call to upload the PDF
    const uploadResponse = await fetch('/upload-pdf', {
      method: 'POST',
      body: formData,
    });

    if (uploadResponse.status !== 200) {
      throw new Error(`API call failed with status ${uploadResponse.status}`);
    }

    // Make an API call to generate questions
    const generateQuestionsResponse = await fetch('/generate-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: 'Updated text for questions' }), // Replace with your text
    });

    if (generateQuestionsResponse.status !== 200) {
      throw new Error(
        `API call to generate questions failed with status ${generateQuestionsResponse.status}`
      );
    }

    // Make an API call to get PDF text
    const getPDFTextResponse = await fetch('/get-pdf-text', {
      method: 'GET',
    });

    if (getPDFTextResponse.status !== 200) {
      throw new Error(
        `API call to get PDF text failed with status ${getPDFTextResponse.status}`
      );
    }

    // Update the PDF text state
    const pdfTextData = await getPDFTextResponse.json();
    setPdfText(pdfTextData.text);
  } catch (error) {
    console.error(error);
  } finally {
    setState('finished');
  }
};
