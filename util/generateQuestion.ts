import OpenAI from "openai";
export const generateQuestions = async (pdfContent: any) => {
    let questionResponse: any = [];
    const openai = new OpenAI({
        apiKey: "OPENAI_API_KEY",
    });
    try {
      const response =  await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k",
        messages: [
                {
                  role: "system",
                  content: `You are a world-class question generator for any course content the user inputs. You will generate 10 questions based on the course content. Here's how you will perform in 4 steps:
            
                                  Step 1: You will receive the course content 
                                  Step 2: You will generate 10 multiple choice questions with 4 choices based on the course content. The questions should be specific to the course content.
                                  Step 3: You will put the course content in a json object array with each object being a question.
            
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
                                  No explanation is needed for the correct answer and the options should be shuffled. 
                                  Step 4: You will return the json object array to the user with no additional explanation
                                  `,
                },
                {
                  role: "user",
                  content: `This is the course content: ${pdfContent}`,
                },
              ]});
              const content = response.choices[0].message.content;
              let responseJSON:any;
              if(content!=null){
                responseJSON= JSON.parse(content);
              }
  
      return responseJSON;
    } catch (err) {
      console.error(err);
      alert("Oops! We ran into an issue trying to generate questions. Try again please!");
      return questionResponse; // Return an empty array or handle the error accordingly.
    }
  };
  