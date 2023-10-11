import Image from "next/image";

interface LoadingProps {
    currentState: string;
    feedback: string;
    setFeedback: React.Dispatch<React.SetStateAction<string>>;
    feedbackSubmit: () => void;
  }

const Loading: React.FC<LoadingProps> = ({
    currentState,
    feedback,
    setFeedback,
    feedbackSubmit
}) => {
    return ( 
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <h1 className="text-5xl font-bold mb-4">
            Are you ready to ace this?
          </h1>
          <p className="text-lg mb-6">
            Your practice questions will generate in 30 seconds! Keep this
            screen open to get your practice questions.
          </p>

          <Image src={"/icon.svg"} height={3412/9} width={2376/9} alt=""/>

          <div className="flex flex-col items-center justify-center pt-4">
            <div className="flex items-end font-bold text-2xl">
                <Image src={"/bulb.svg"} height={2000/18} width={1000/18} alt="" />
                <span className="pl-2 pb-3">Did you know?</span>
            </div>
            <div className="text-xl font-light mx-[22%]">
                <span>Research shows that doing practice questions increases test results, while re-reading notes is shown to be ineffective.</span>
                <br/>
                <span> Aceflow lets you practice infinitely to ace school.</span>
            </div>
          </div>


          {currentState === 'loading' ? (
            <div className="pt-20 w-full max-w-xl mx-auto">
              <label htmlFor="feedback" className="block text-xl font-semibold">
                In the meantime, let us know why you are using Aceflow:
              </label>
              
                <div className="flex flex-row gap-2  mt-2">
                    <input
                    type="text"
                    id="feedback"
                    placeholder="I'm using Aceflow because ..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-[80%] border rounded-lg p-2 text-gray-800 focus:outline-none focus:border-blue-500"
                    />
                    <button
                        onClick={feedbackSubmit}
                        className="w-[20%] bg-aceflow-blue text-lg font-semibold text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>

              <p className="text-md text-gray-600 mt-2">
                Your feedback helps us build better tools for you.
              </p>
            </div>
          ) : (
            <div className="text-2xl text-green-500 mt-6">You're awesome, thank you so much!</div>
          )}
        </div>
     );
}
 
export default Loading;