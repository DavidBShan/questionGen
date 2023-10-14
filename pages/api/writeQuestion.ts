import fs from 'fs';
import OpenAI from 'openai';
export default async (req: any, res: any) => {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
});
    if (req.method === 'POST') {
        try {
          const parsedText = JSON.parse(req.body).text;
          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-16k",
            temperature: 1.2,
                  messages:[
                      {
                        role: "system",
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
                        role: "user",
                        content: `This is the text: ${parsedText}`,
                      },
                    ],
                  });
                  const questions = response.choices[0].message.content;
                  if(questions!=null){
                    const responseObject = JSON.parse(questions);
                    const outputPath = ".output/static/questions.json";
            fs.writeFileSync(
                outputPath,
                JSON.stringify(responseObject, null, 2)
            );
            res.status(200).json({ message: 'question generated' });
                  }
        } catch (error) {
          console.error('Error during question generation:', error);
          return res.status(500).json({ success: false, error: 'An error occurred while saving the questions' });
        }
      }
  };