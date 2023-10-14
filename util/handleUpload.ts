import { handleDailyStreak } from './handleDailyStreak';
//const fs = require('fs');
const pdf = require('pdf-parse'); // Import pdf-parse
import { Buffer } from 'buffer'; // Import the Buffer class

export const handleFileUpload = async (file: File | null, setState: (state: string) => void, setPdfText: (text: string | null) => void, userId: any, setDailyStreak: any) => {
    if (!file) return;

    setState('loading');
    handleDailyStreak(userId, setDailyStreak);
    try {
        // Create a FileReader to read the selected file
        const reader = new FileReader();

        reader.onload = async (event) => {
            const fileData = event.target?.result as ArrayBuffer | null;
            if (fileData) {
                const buffer = Buffer.from(fileData); // Convert ArrayBuffer to Buffer

                // Use pdf-parse to extract text from the PDF
                const data = await pdf(buffer);
                const extractedText = data.text;

                const writeResponse = await fetch('/api/writeQuestion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Adjust content type if needed
                    },
                    body: JSON.stringify({ text: extractedText }),
                });

                if (!writeResponse.ok) {
                    throw Error(`HTTP error! Status: ${writeResponse.status}`);
                }

                setPdfText(extractedText);
                setState('finished');
            }
        };

        // Read the PDF file as an ArrayBuffer
        reader.readAsArrayBuffer(file);

    } catch (error) {
        console.error(error);
        setState('error');
    }
};
