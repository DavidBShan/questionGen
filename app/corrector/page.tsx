'use client';

import Button from "react-bootstrap/Button";
import BigButton from "../components/Button";
import Form from "react-bootstrap/Form";
import { InputGroup, ListGroup, Row } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { FaTrashCan } from "react-icons/fa6";
import BarGraph from "./BarGraph";
import { PieChart } from "react-minimal-pie-chart";
import TextArea from "../components/TextArea";

import { useRouter } from "next/navigation";

import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Loader from "../components/Loader";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const Corrector = () => {

    const session = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/login');
        },
      });

    
    const user = session?.data?.user;
    const router = useRouter();


    const [loadingPage, setLoadingPage] = useState(true);


    useEffect(() => {
        const checkAuthentication = async () => {
          await new Promise((resolve) => setTimeout(resolve, 50))
          setLoadingPage(false);
        };
        checkAuthentication();
      }, [user])

    const [criteriaOn, setCriteriaOn] = useState<boolean>(false);
    const [criteria, setCriteria] = useState<string[]>([]);
    const [criteriaValue, setCriteriaValue] = useState("");

    const [textType, setTextType] = useState("");
    const [loading, setLoading] = useState(false);

    const [assignmentText, setAssignmentText] = useState("");

    const [charCount, setCharCount] = useState(0);
    const maxCharCount = 2000; // Define the maximum character count

    const [responseParsed, setResponseParsed] = useState<any>(null);

    const [mark, setMark] = useState<any>(0);
    const [feedback, setFeedback] = useState("");

    const resultRef = useRef<HTMLElement | null>(null);

    const [grammar, setGrammar] = useState(0);
    const [structure, setStructure] = useState(0);
    const [thinking, setThinking] = useState(0);
    const [title, setTitle] = useState("");
    const mountRef = useRef(false);

    const inputRef = useRef<HTMLTextAreaElement | null>(null); // Define inputRef using the useRef hook

    useEffect(() => {
        const inputElement = inputRef.current;
        if (inputElement) {
          const { width } = inputElement.getBoundingClientRect();
          inputElement.style.width = `${width}px`;
        }
      }, [title]);

    const addCriteria = (name: string) => {
        if (!name) return;

        if (criteria.length >= 3) {
            alert("You can only add up to 3 criteria.");
            return;
        }

        setCriteria([...criteria, name]);
        setCriteriaValue("");
      };

      const handleAssignmentTextChange = (text: string) => {
        if (text.length <= maxCharCount) {
          setAssignmentText(text);
          setCharCount(text.length);
        } else {
            setAssignmentText(text.slice(0, maxCharCount));
            setCharCount(maxCharCount);
            alert("You have surpassed 2000 characters.");
        }
      };

    const handleCriteriaChange = (index: number, value: string) => {
    const updatedCriteria = [...criteria];
    updatedCriteria[index] = value;
    setCriteria(updatedCriteria);
    };

    const handleDeleteCriteria = (index: number) => {
    const updatedCriteria = [...criteria];
    updatedCriteria.splice(index, 1);
    setCriteria(updatedCriteria);
    };

    const gradeAssignment = (e: any) => {
        if (!assignmentText) {
            alert ('Don\'t forget to paste the assignment!');
            return;
        }
            e.preventDefault();
            let criteriaString = "";

        if(textType == "") {
            alert("Please enter the text type :)");
            return;
        }

        const gradeAssignmentFunction = async (prompt:any) => {
            setLoading(true);

            const response = await fetch(
                "https://gradeassist-yrhacks-server.vercel.app/api",
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({
                    prompt: prompt,
                    }),
                }
                )
                .then((response) => response.json())
                .then((data) => {
                    

                    // console.log("response data", data.result.content);
                    
                    try {
                    
                        let responseJSONParsed = JSON.parse(data.result.content);

                        responseJSONParsed.feedback = responseJSONParsed.feedback.replace("1. ", '');
                        responseJSONParsed.feedback = responseJSONParsed.feedback.replace(/\n2\./g, '\n');
                        responseJSONParsed.feedback = responseJSONParsed.feedback.replace(/\n(\d+\.)/g, '\n');

                        setResponseParsed(responseJSONParsed);
                        setMark(responseJSONParsed.overall_mark);
                        setFeedback(responseJSONParsed.feedback);
        
                        // console.log("response data 2", responseJSONParsed);
                        // console.log("response feedback", responseJSONParsed.feedback);

                    resultRef.current!.scrollIntoView({ behavior: "smooth" });
                    } catch (err) {
                    console.log(err)
                    alert(
                        "Oops! We ran into an issue trying to mark your assignment. Try again please!"
                    );
                    }
        
                    setLoading(false);
                })
                .catch((error) => {
                    alert(
                        "Oops! We ran into an issue trying to mark your assignment. Try again please!"
                    );
                    console.log(error); 
                    setLoading(false);
                });
        }

    if (criteria.length < 1) {
        setLoading(true);

        let prompt = [
            {
                role: "system",
                content: `You are a world-class writing coach for English that grades writing on a scale of 0 - 100. Additionally, you offer excellent feedback that helps writers drastically improve their writing. Here's how you will perform in 4 steps:

                        Step 1: You will receive writing you will grade and offer feedback on.
                        Step 2: Ensure you're strict with grading, and think of a grade for the writing on a scale of 1 - 100. 
                        Step 3: For the feedback, conceptualize 1 strength and 2 weaknesses in the following writing delimited with triple quotes ('''). The strengths and weaknesses should be specific and actionable. To back up weaknesses, quote examples in the writing.
                        Step 4: Check that the examples you provide for the strengths and weaknesses actually make sense. For example, if a weakness is grammar, don't use a sentence with perfect grammar as the example. If you're saying a specific sentence needs a comma, the sentence you quote shouldn't have that comma. If you realize you've made this mistake, remove that example, and provide an example that is actually fitting.

                        In the feedback part of the response make sure you use markdown, your feedback should be over 80 words long and have this format:
                        
                        (Make sure you're using markdown)

                        1. **Overall:** (your overall feedback in 2 sentences)
                        \n
                        2. **Your Strength:** (strength with the examples)
                        \n
                        3. **Weakness 1:** (weakness 1 with the examples)
                        \n 
                        4. **Weakness 2:** (weakness 2 with the examples)    

                        You should give your response in the following JSON format:  {"overall_mark": "YOUR_MARK_WITHOUT_PERCENT_SYMBOL", "feedback": "YOUR_FEEDBACK_WITH_STRENGHTS_AND_WEAKNESSES_USING_MARKDOWN"}
                        `,
            },
            {
                role: "user",
                content: `This is what the writing is supposed to be: ${textType}. This is the writing you are coaching: '''${assignmentText}'''`,
            },
            ];

        gradeAssignmentFunction(prompt);
            
    } else {
        setLoading(true);
        criteria.forEach((value, index) => {
        criteriaString += index + 1 + ". " + value + "\n";
        });
        console.log(criteriaString);

        let prompt = [
            {
                role: "system",
                content: `You are a world-class writing coach for English that grades writing on a scale of 0 - 100. Additionally, you offer excellent feedback that helps writers drastically improve their writing. Here's how you will perform in 4 steps:

                        Step 1: You will receive writing you will grade and offer feedback on.
                        Step 2: Take into account the criteria delimited with {} when grading and offering advice. Analyze the criteria and understand what a high-standards 100 looks like.
                        Step 3: Ensure you're strict with grading, and think of a grade for the writing on a scale of 1 - 100, which is based on the criteria provided. If none of the criteria are met, assign a 0. 
                        Step 4: For the feedback, conceptualize 1 strength and 3 weaknesses in the following writing delimited with triple quotes (''') based on the criteria delimited by {}. The strengths and weaknesses should be specific and actionable. To back up weaknesses, quote examples in the writing.

                        In the feedback part of the response make sure you use markdown, your feedback should be over 80 words long and have this format:
                        
                        (Make sure you're using markdown)

                        1. **Overall:** (your overall feedback in 2 sentences)
                        \n(whitespace)
                        2. **Your Strength:** (strength with the examples)
                        \n(whitespace)
                        3. **Weakness 1:** (weakness 1 with the examples)
                        \n(whitespace)
                        4. **Weakness 2:** (weakness 2 with the examples)    

                        You must give your response in the following JSON format: {"overall_mark": "YOUR_MARK_WITHOUT_PERCENT_SYMBOL", "feedback": "YOUR_FEEDBACK_WITH_STRENGHTS_AND_WEAKNESSES_USING_MARKDOWN"}`,
            },
            {
                role: "user",
                content: `This is what the writing is supposed to be: ${textType} and these are the criteria you're grading on: {${criteriaString}}. This is the writing you are coaching: '''${assignmentText}'''`,
            },
            ];

            //                        Step 5: Lastly, give 3 quick grades on grammar, structure and thinking.
            //, "grammar": "grammar_grade", "grammar": "structure", "thinking": "thinking"
            // Step 5: Check that the examples you provide for the strengths and weaknesses actually make sense. For example, if a weakness is grammar, don't use a sentence with perfect grammar as the example. If you're saying a specific sentence needs a comma, the sentence you quote shouldn't have that comma. If you realize you've made this mistake, remove that example, and provide an example that is actually fitting.

        gradeAssignmentFunction(prompt);
    }
    };
    
    function WordCount(str: string) {
        return str.split(" ").length;
      }
  
      let wordCount = WordCount(assignmentText);
  
      function CharCount(str: string) {
        return str.length;
      }
  
    //   let charCount = CharCount(assignmentText);

    return ( 

        <div className="flex flex-col grid grid-cols-1 gap-10 items-center justify-center 
            m-10
            lg:p-20
        ">
          
            {loadingPage? ( <Loader/> ): user ? (
                <div className="grid md:grid-cols-2 gap-4">
                <Form className="flex flex-col items-center gap-5">
                
                <div className="w-full max-w-lg mt-4 flex items-center">
                    <TextArea
                    required
                    placeholder="Untitled writing"
                    classNamePassedDown="text-lg grow md:text-3xl p-2 max-h-14 font-bold placeholder-blue-200 outline-0"
                    />

                    <BigButton
                    label={"Feedback"}
                    onClick={gradeAssignment}
                    rounded
                    disabled={loading}
                    classNamePassedDown="w-40 lg:w-60 text-lg md:text-xl bg-customGreen2 border-customGreen2" // Add this line
                    />
                </div>

                    <TextArea 
                    required 
                    resize
                    placeholder= "Start typing or paste your writing here. 2000 character limit."
                    classNamePassedDown="
                    text-sm
                    max-w-lg
                    md:text-md p-4 font-bold bg-blue-100 bg-opacity-50 placeholder-blue-200 outline-0 min-h-[500px] max-h-screen"
                    onChange={(event) => handleAssignmentTextChange(event.target.value)}
                    value={assignmentText}
                    />
            
                <div className="w-full max-w-lg grid gap-4">
                    <h1 className="text-blue-500 text-md md:text-xl font-bold">
                        What type of text is this?
                    </h1>

                    <TextArea
                    required
                    classNamePassedDown={"text-sm md:text-md p-4 max-h-14 font-bold bg-blue-100 bg-opacity-50 placeholder-blue-200 outline-0"}
                    placeholder="Essay, research paper, etc"
                    onChange={(event) => setTextType(event.target.value)}
                    />
                </div>

                <div className="w-full max-w-lg">
                    <button className="text-blue-500 text-md md:text-xl font-bold cursor-pointer" onClick={(e) => { e.preventDefault(); setCriteriaOn(!criteriaOn) }}>
                        + Add your criteria (optional)
                    </button>

                    {criteriaOn && (
                        <>
                            <ul className="list-group">
                                {criteria.map((currentValue, index) => (
                                    <li
                                        className="mb-1 p-0 rounded-lg flex justify-center items-center list-group-item"
                                        key={index}
                                    >
                                        <input
                                            type="text"
                                            placeholder="change this criteria"
                                            className="text-sm md:text-md p-4 max-h-14 font-bold bg-blue-100 bg-opacity-50 placeholder-blue-200 outline-0 w-full 
                                            max-w-lg
                                            rounded-3xl"
                                            value={criteria[index]}
                                            onChange={(event) => handleCriteriaChange(index, event.target.value)}
                                        />
                                        <div className="flex-1 p-5 text-2xl">
                                            <FaTrashCan
                                                className="cursor-pointer hover:text-red-500"
                                                onClick={() => handleDeleteCriteria(index)}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <InputGroup className="mt-3 flex space-x-3">
                                <Form.Control
                                    placeholder="e.g. Student meets the grade 10 standards of the english curriculum"
                                    aria-label="your criterion"
                                    aria-describedby="basic-addon2"
                                    className="text-sm md:text-md p-4 max-h-14 font-bold bg-blue-100 bg-opacity-50 placeholder-blue-200 outline-0 w-full 
                                            
                                            max-w-lg
                                            rounded-lg"
                                    value={criteriaValue}
                                    onChange={(event) => setCriteriaValue(event.target.value)}
                                />
                                <Button
                                    variant="outline-success"
                                    disabled = {(criteria.length >= 3)}
                                    id="button-addon2"
                                    className="border border px-3 rounded-lg hover:opacity-80 text-sm md:text-md font-semibold text-white bg-green-400
                                    disabled:opacity-70
                                    disabled:cursor-not-allowed
                                    disabled:hover:text"
                                    onClick={() => addCriteria(criteriaValue)}
                                >
                                    Add
                                </Button>                                
                            </InputGroup>
                        </>
                    )}
                </div>

                </Form>
        
                <Row id="result" ref={resultRef}>
                    {responseParsed && (
                        <div className="grid gap-8">
                            <div id="donutContainerCSS" className="flex justify-center items-center rounded-3xl border-2 p-8 border-blue-500">    
                                <h1 className="text-3xl font-bold">Grade:</h1>
                                {loading? <div className="pl-4"><Loader/></div> :
                                (<PieChart
                                    data={[
                                    {
                                        title: `${mark}%`,
                                        value: parseInt(mark),
                                        color: mark > 70 ? 'green' : 'orange',
                                    },
                                    {
                                        title: '',
                                        value: 100 - parseInt(mark),
                                        color: mark > 0 ? '#F6F9F4' : 'rgba(0, 0, 0, 0.1)',
                                    },
                                    ]}
                                    radius={40}
                                    lineWidth={10}
                                    label={({ dataEntry }) => dataEntry.title}
                                    labelPosition={0}
                                    labelStyle={{
                                    fontSize: '30px',
                                    fontWeight: 'bold',
                                    fill: mark > 70 ? 'green' : 'orange',
                                    }}
                                    animate
                                    className="max-w-xs"
                                />) 
                                }
                            </div>

                            <div id="feedbackBox" className="min-h-80 border-2 rounded-3xl p-8 w-full">
                                <h1 id="feedbackTitle" className="text-xl font-bold">
                                Media Feedback:
                                </h1>
                                <p className="counts font-bold">Word Count: {wordCount}</p>
                                <p className="counts font-bold">Character Count: {charCount}</p>
                                <br></br>
                                {loading? <Loader/> :
                                 (<div className="whitespace-break-spaces">
                                   <ReactMarkdown>{feedback}</ReactMarkdown>
                                </div>)
                                }

                            </div>
                    
                        </div>
                    )}
                </Row>
                </div>
            ): 
            

            (<div>
                <div>You must be logged in to view this page</div>
                <BigButton
                label="Go to login page"
                onClick={() => { router.push(`/login`);
            }}
              />
            </div>)}
            
        </div>
    );
}
 
export default Corrector;