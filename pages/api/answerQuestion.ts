import { handleSentMessagesTutor } from '@/util/users';
import OpenAI from 'openai';
export default async (req: any, res: any) => {
  const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  });
    if (req.method === 'POST') {
        try {
          handleSentMessagesTutor(req.body.uid);
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
                      content: `This is the course content: ${req.body.text}. This is the question: ${req.body.question}`,
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
