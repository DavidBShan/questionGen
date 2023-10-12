const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const OpenAI = require('openai');

const app = express();

app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
});

app.post('/upload-pdf', async (req, res) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const form = new formidable.IncomingForm();
        form.uploadDir = path.join(__dirname, 'uploads');

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: 'Form parsing error: ' + err.message });
            }

            const pdfFile = files.pdf;
            if (!pdfFile) {
                return res.status(400).json({ error: 'PDF file not found in formData' });
            }

            const uploadsFolder = path.join(__dirname, 'uploads');
            if (!fs.existsSync(uploadsFolder)) {
                fs.mkdirSync(uploadsFolder);
            }

            const uniqueFileName = 'uploadedfile';
            fs.renameSync(pdfFile.path, path.join(uploadsFolder, uniqueFileName));

            const txt = await readPDF(path.join(uploadsFolder, uniqueFileName));

            const jsonData = { text: txt };
            const jsonFileName = path.join(uploadsFolder, 'output.json');
            fs.writeFileSync(jsonFileName, JSON.stringify(jsonData, null, 2));

            return res.status(200).json({ message: 'PDF uploaded and saved successfully' });
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({ error: 'An error occurred during processing' });
    }
});

async function readPDF(pdfPath) {
    return new Promise((resolve, reject) => {
        try {
            const dataBuffer = fs.readFileSync(pdfPath);
            pdf(dataBuffer).then(function (data) {
                resolve(data.text);
            });
        } catch (error) {
            reject(error);
        }
    });
}

// Generate questions from text
app.post('/generate-questions', async (req, res) => {
    try {
        const parsedText = req.body.text;
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-16k',
            temperature: 1.2,
            messages: [
                {
                    role: 'system',
                    content: `You are a world-class question generator for any text the user inputs. You will generate 10 questions based on the text. Here's how you will perform in 4 steps:
          
                    Step 1: You will receive the text 
                    Step 2: You will generate 10 multiple choice questions with 4 choices based on the text. The questions should be specific to the text.
                    Step 3: You will put the questions in a JSON object array with each object being a question.
                    
                    Each question object should be in the following format: 
                    {question: "THE_QUESTION_YOU_GENERATE",
                    options: ["OPTION_1", "OPTION_2", "OPTION_3", "OPTION_4"],
                    correctAnswer: "CORRECT_OPTION"}
                    
                    Here is an example: 
                    {
                      question: "What is the capital of France?",
                      options: ["Madrid", "London", "Paris", "Berlin"],
                      correctAnswer: "Paris"
                    }
          
                    I want the overall format of response to be:
                    [
                      {
                        question: "What is the capital of France?",
                        options: ["Berlin", "Madrid", "Paris", "Rome"],
                        correctAnswer: "Paris",
                      },
                      {
                        question: "Which planet is known as the Red Planet?",
                        options: ["Earth", "Mars", "Jupiter", "Venus"],
                        correctAnswer: "Mars",
                      },
                      // Add more 8 questions here
                    ];
          
                    No explanation is needed for the correct answer, and the options should be shuffled. 
                    Step 4: You will return the JSON array to the user with no additional explanation IMPORTANT: I JUST WANT AN ARRAY OF QUESTIONS. NO EXPLANATION OR ADDITIONAL INFORMATION IS NEEDED
          `,
                },
                {
                    role: 'user',
                    content: `This is the text: ${parsedText}`,
                },
            ],
        });

        const questions = response.choices[0].message.content;
        if (questions != null) {
            const responseObject = JSON.parse(questions);
            const outputPath = path.join(__dirname, 'uploads/questions.json');
            fs.writeFileSync(outputPath, JSON.stringify(responseObject, null, 2));

            return res.status(200).json({ message: 'Questions generated!' });
        }
    } catch (error) {
        console.error('Error during question generation:', error);
        return res.status(500).json({ success: false, error: 'An error occurred while generating questions' });
    }
});

app.get('/get-pdf-text', async (req, res) => {
    const txt = await readPDF(path.join(__dirname, 'uploads/uploadedfile'));

    return res.status(200).json({ text: txt });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
