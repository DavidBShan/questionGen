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
        <div className="flex h-screen flex-col items-center p-10 text-center">
          <h1 className="mb-4 text-3xl font-bold md:text-5xl">
            Are you ready to ace this?
          </h1>
          <p className="mb-6 px-2 text-sm md:px-0 md:text-lg">
            Your practice questions will generate in 30 seconds! Keep this
            screen open to get your practice questions.
          </p>

          <div className="spinning-container">
            
          <Image src={"/earth-removebg.png"} height={3412/10} width={2376/10} alt="" className="animate-spin px-6 md:px-0"/>
          </div>
          <div className="flex flex-col items-center justify-center pt-4 ">
            <div className="flex items-end text-lg font-bold md:text-2xl">
                <Image src={"/bulb.svg"} height={2000/18} width={1000/18} alt="" className="w-12 md:w-14" />
                <span className="pb-3 pl-2">Did you know?</span>
            </div>
            <div className="mx-4 text-base font-light md:mx-[22%] md:text-xl">
                <span>Research shows that doing practice questions increases test results, while re-reading notes is shown to be ineffective.</span>
                <br/>
                <span> Aceflow lets you practice infinitely to ace school.</span>
            </div>
          </div>


          {currentState === 'loading' ? (
            <div className="mx-auto w-full max-w-2xl px-5 pt-10 md:px-0 md:pt-20">
              <label htmlFor="feedback" className="block text-base font-semibold md:text-xl">
                In the meantime, let us know why you are using Aceflow:
              </label>
              
                <div className="mt-2 flex flex-row  gap-2">
                    <input
                    type="text"
                    id="feedback"
                    placeholder="I'm using Aceflow because ..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-[80%] rounded-lg border p-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none md:text-lg"
                    />
                    <button
                        onClick={feedbackSubmit}
                        className="w-[20%] rounded-lg bg-aceflow-blue py-2 text-sm font-semibold text-white hover:bg-blue-600 md:text-lg"
                    >
                        Submit
                    </button>
                </div>

              <p className="mt-2 text-sm text-gray-600 md:text-lg">
                Your feedback helps us build better tools for you.
              </p>
            </div>
          ) : (
            <div className="mt-6 text-lg text-green-500 md:text-2xl">You're awesome, thank you so much!</div>
          )}
        </div>
     );
}
 
export default Loading;