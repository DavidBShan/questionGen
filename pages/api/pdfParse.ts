const fs = require('fs');
const pdf = require('pdf-parse');

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
        const txt = await readPDF("uploads/uploadedfile");

        const jsonData = { text: txt };
        const jsonFileName = "uploads/output.json";

        fs.writeFileSync(jsonFileName, JSON.stringify(jsonData, null, 2));
        
        res.status(200).json({ txt });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while processing the PDF." });
    }
}
