import pdfDoc from '../../uploads/output.json'
import OpenAI from 'openai';
export default async (req: any, res: any) => {
  const openai = new OpenAI({
      apiKey: "OPENAI_API_KEY",
  });
    if (req.method === 'POST') {
        try {
          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-16k",
            temperature: 1.2,
                  messages:[
                    {
                      role: "system",
                      content: `You will be given a question as well as course content. You will answer the question based on the course content. If the course content doesn't help with the question answer accordingly. 
                `,
                    },
                    {
                      role: "user",
                      content: `This is the course content: ${pdfDoc.text}. This is the question: ${req.body.question}`,
                    },
                  ],
                  });
                  res.status(200).json({ message: response.choices[0].message.content });
        } catch (error) {
          console.error('Error during question generation:', error);
          return res.status(500).json({ success: false, error: 'An error occurred while saving the questions' });
        }
      }
  };
