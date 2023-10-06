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
                        content: `You will be given a question as well as course content. You will answer the question based on the course content. If the course content doesn't help with the question answer accordingly. 
          `,
                      },
                      {
                        role: "user",
                        content: `This is the course content: ${req.body.courseContent}. This is the question: ${req.body.question}`,
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