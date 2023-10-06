import fs from 'fs';
export default async (req: any, res: any) => {
    if (req.method === 'POST') {
        try {
          const response = await fetch(
              "https://gradeassist-yrhacks-server.vercel.app/api",
              {
                  method: "POST",
                  mode: "no-cors",
                  headers: {
                  "Content-Type": "application/json",
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: JSON.stringify({
                  prompt:[
                      {
                        role: "system",
                        content: `You are a world-class question generator for any course content the user inputs. You will generate 10 questions based on the course content. Here's how you will perform in 4 steps:
          
          Step 1: You will receive the course content 
          Step 2: You will generate 10 multiple choice questions with 4 choices based on the course content. The questions should be specific to the course content.
          Step 3: You will put the course content in a JSON object array with each object being a question.
          
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
          No explanation is needed for the correct answer, and the options should be shuffled. 
          Step 4: You will return the JSON object array to the user with no additional explanation
          `,
                      },
                      {
                        role: "user",
                        content: `This is the course content: ${req.body}`,
                      },
                    ],
                  }),
                })
                .then((response) => {
                  console.log(response.status); // Log the response status
                  return response.text(); // Read the response as text
                })
                .then((data) => {
                  console.log(data); // Log the response data as text
                  try {
                    const parsedData = JSON.parse(data); // Attempt to parse the response as JSON
                    console.log(parsedData);
                    // Handle the parsed data as needed
                  } catch (err) {
                    console.error('Error parsing JSON:', err);
                    console.log(
                      "Oops! We ran into an issue trying to mark your assignment. Try again please!"
                    );
                  }
                })
                .catch((error) => {
                  console.error(
                    "Oops! We ran into an issue trying to mark your assignment. Try again please!"
                  );
                  console.error(error);
                });
        } catch (error) {
          console.error('Error during question generation:', error);
          return res.status(500).json({ success: false, error: 'An error occurred while saving the questions' });
        }
      }
  };