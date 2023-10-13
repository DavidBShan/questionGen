import formidable from 'formidable';
const fs = require('fs');
const pdf = require('pdf-parse');

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function uploadPDFHandler(req: any, res: any) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error:', err.message);
      res.status(500).json({ error: 'An error occurred during processing' });
      return;
    }
    if(files.pdf) {
        const pdfFile = files.pdf[0];
        if (!pdfFile) {
            res.status(400).json({ error: 'PDF file not found in formData' });
            return;
        }
      
          const pdfPath = (pdfFile as any).path;
      
          try {
            const dataBuffer = fs.readFileSync(pdfPath);
      
            pdf(dataBuffer)
              .then(function (data: any) {
                const text = data.text;
      
                // Save the text to a JSON file
                const jsonData = { text };
                res.status(200).json({ text });
              })
              .catch(function (error: any) {
                res.status(500).json({ error: 'An error occurred while processing the PDF.' });
              });
          } catch (error) {
            res.status(500).json({ error: 'An error occurred while processing the PDF.' });
          }
    } 
  });
}
