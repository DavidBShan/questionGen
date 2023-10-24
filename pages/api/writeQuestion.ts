/* eslint-disable import/no-anonymous-default-export */
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
            model: "gpt-3.5-turbo",
            temperature: 1.2,
                  messages:[
                      {
                        role: "system",
                        content: `You are a world-class question generator for any text the user inputs. You will generate 10 questions based on the text. Here's how you will perform in 4 steps:
          
          Step 1: You will receive the text 
          Step 2: You will generate 10 multiple choice questions with 4 choices based on the text. The questions should be specific to the text and out of the choices make sure that only one of them is correct. Make the questions obvious if the person doing the test has read the text
          Step 3: You will put the questions in a JSON object array with each object being a question.
          
          Each question object should be in the following format: 
          {question: "THE_QUESTION_YOU_GENERATE",
          options: ["OPTION_1", "OPTION_2", "OPTION_3", "OPTION_4"],
          correctAnswer: "CORRECT_OPTION"}

          I want the overall format of response to be:
          [
            {
              question: "What is the capital of France?",
              options: ["Berlin", "Madrid", "Paris", "Rome"],
              correctAnswer: "Paris",
            },
            // Add more 9 questions here
          ];

          No explanation is needed for the correct answer, and the options should be shuffled. 
          No explanation is needed for the correct answer, and the options should be shuffled. 
          Make sure that the correctAnswer property is completely the same as one of the optitons
          Make sure that the correctAnswer property is completely the same as one of the optitons
          Step 4: You will return the JSON array to the user with no additional explanation
          `,
                      },
                      {
                        role: "user",
                        content: `This is the text: ${parsedText}`,
                      },
                    ],
                  });
                  const questions = response.choices[0].message.content;
                  console.log(questions);
                  if(questions!=null){
                    res.status(200).json({questions});
                  }
        } catch (error:any) {
          console.error('Error during question generation:', error);

          if (error?.message.includes("Please reduce the length of the messages.")) {
            // Handle the specific error
            return res.status(400).json({
              success: false,
              statusText: 'Please reduce the length of the messages.',
            });
          } else {
            // Handle other errors
            return res.status(500).json({
              success: false,
              error: 'An error occurred while saving the questions',
            });
          }
        }
      }
  };