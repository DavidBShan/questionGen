import { generateQuestions } from "./generateQuestion";
export const handleFileUpload = async (file: File | null, setState: (state: string) => void, setPdfText: (text: string | null) => void) => {
    if (!file) return;
    setState('loading');
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
      const pdfParseResponse = await fetch('/api/pdfParse', {
        method: 'POST',
      });
      if (pdfParseResponse.status !== 200) {
        throw new Error(
          `API call to pdfparse failed with status ${pdfParseResponse.status}`
        );
      }
      const pdfParseData = await pdfParseResponse.json();
      const updatedText = pdfParseData.txt;
      const writeResponse = await fetch('/api/writeQuestion', {
        method: 'POST',
        body: JSON.stringify( {text:updatedText} )
      });
    } catch (error) {
      console.error(error);
    } finally {
      setState('finished');
    }
  };
  