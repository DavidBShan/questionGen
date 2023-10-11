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
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Are you ready to ace this?
          </h1>
          <p className="text-sm md:text-lg mb-6 px-2 md:px-0">
            Your practice questions will generate in 30 seconds! Keep this
            screen open to get your practice questions.
          </p>

          <Image src={"/icon.svg"} height={3412/9} width={2376/9} alt="" className="px-6 md:px-0"/>

          <div className="flex flex-col items-center justify-center pt-4 ">
            <div className="flex items-end font-bold text-lg md:text-2xl">
                <Image src={"/bulb.svg"} height={2000/18} width={1000/18} alt="" className="w-12 md:w-14" />
                <span className="pl-2 pb-3">Did you know?</span>
            </div>
            <div className="text-md md:text-xl font-light mx-4 md:mx-[22%]">
                <span>Research shows that doing practice questions increases test results, while re-reading notes is shown to be ineffective.</span>
                <br/>
                <span> Aceflow lets you practice infinitely to ace school.</span>
            </div>
          </div>


          {currentState === 'loading' ? (
            <div className="pt-10 md:pt-20 px-5 md:px-0 w-full max-w-2xl mx-auto">
              <label htmlFor="feedback" className="block text-md md:text-xl font-semibold">
                In the meantime, let us know why you are using Aceflow:
              </label>
              
                <div className="flex flex-row gap-2  mt-2">
                    <input
                    type="text"
                    id="feedback"
                    placeholder="I'm using Aceflow because ..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-[80%] border text-sm md:text-lg rounded-lg p-2 text-gray-800 focus:outline-none focus:border-blue-500"
                    />
                    <button
                        onClick={feedbackSubmit}
                        className="w-[20%] bg-aceflow-blue text-sm md:text-lg font-semibold text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>

              <p className="text-sm md:text-lg text-gray-600 mt-2">
                Your feedback helps us build better tools for you.
              </p>
            </div>
          ) : (
            <div className="text-lg md:text-2xl text-green-500 mt-6">You're awesome, thank you so much!</div>
          )}
        </div>
     );
}
 
export default Loading;