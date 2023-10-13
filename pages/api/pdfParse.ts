import { NextApiRequest, NextApiResponse } from 'next';
import pdf from 'pdf-parse';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end(); 
    }
    const pdfFile = req.body.pdf;
    if (!Buffer.isBuffer(pdfFile)) {
      return res.status(400).json({ error: 'Invalid PDF data' });
    }
    const pdfBuffer = Buffer.from(pdfFile);
    const pdfData = await pdf(pdfBuffer);
    if (!pdfData.text) {
      return res.status(500).json({ error: 'Failed to extract text from the PDF' });
    }
    const extractedText = pdfData.text;
    return res.status(200).json({ text: extractedText });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while parsing the PDF' });
  }
};
