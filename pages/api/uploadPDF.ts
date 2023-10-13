import fs from 'fs';
import path from 'path';
const formidable = require('formidable');

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req:any, res:any) {
  try {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), 'public/uploads'); 
    form.parse(req, async (err:any, fields:any, files:any) => {
      if (err) {
        throw new Error('Form parsing error: ' + err.message);
      }
      const pdfFile = files.pdf;
      if (!pdfFile) {
        throw new Error('PDF file not found in formData');
      }
      const uploadsFolder = path.join(process.cwd(), 'public/uploads');
      if (!fs.existsSync(uploadsFolder)) {
        fs.mkdirSync(uploadsFolder);
      }
      const uniqueFileName = `uploadedfile.pdf`;
      fs.renameSync(pdfFile[0].filepath, path.join(uploadsFolder, uniqueFileName));

      res.status(200).json({ message: 'PDF uploaded and saved successfully' });
    });
  } catch (error:any) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred during processing' });
  }
}