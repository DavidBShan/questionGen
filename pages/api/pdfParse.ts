import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import pdf from 'pdf-parse';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error:', err.message);
        res.status(500).json({ error: 'An error occurred during processing' });
        return;
      }

      const pdfFile = files.pdf;

      if (!pdfFile) {
        res.status(400).json({ error: 'PDF file not found in formData' });
        return;
      }
      console.log('pdfFile', pdfFile);

      try {
        //const txt = await readPDF(pdfPath);
        res.status(200).json({ text: pdfFile});
      } catch (error) {
        console.error('Error processing PDF:', error);
        res.status(500).json({ error: 'An error occurred while processing the PDF.' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

async function readPDF(pdfPath: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const dataBuffer = fs.readFileSync(pdfPath);
      pdf(dataBuffer).then(function (data: any) {
        resolve(data.text);
      });
    } catch (error) {
      reject(error);
    }
  });
}
