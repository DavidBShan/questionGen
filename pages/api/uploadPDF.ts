import fs from 'fs';
import path from 'path';
const pdf = require('pdf-parse');
const formidable = require('formidable');

export const config = {
  api: {
    bodyParser: false,
  },
};

async function readPDF(pdfPath:any) {
  return new Promise(async (resolve, reject) => {
      try {
          const dataBuffer = fs.readFileSync(pdfPath);
          pdf(dataBuffer).then(function (data:any) {
              resolve(data.text);
          });
      } catch (error) {
          reject(error);
      }
  });
}

export default async function handler(req:any, res:any) {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const form = new formidable.IncomingForm();
    form.parse(req, async (err:any, fields:any, files:any) => {
      if (err) {
        throw new Error('Form parsing erroer: ' + err.message);
      }
      const pdfFile = files.pdf;
      const text = readPDF(pdfFile[0].filepath);
      console.log(text);
      if (!pdfFile) {
        throw new Error('PDF file not found in formData');
      }

      res.status(200).json({ message: 'PDF uploaded and saved successfully' });
    });
  } catch (error:any) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred during processing' });
  }
}