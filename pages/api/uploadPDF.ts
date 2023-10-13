import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: any, res:any) {
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
    res.status(200).json({ message: 'PDF uploaded successfully', pdfFile });
  });
}
