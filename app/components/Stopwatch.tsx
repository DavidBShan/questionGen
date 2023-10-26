'use client';
import { useState, useEffect } from 'react';

export let timeTaken = "";


const StopwatchComponent = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: any;

    if (isRunning) {
      // Start the stopwatch
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    } else {
      // Clear the interval if the stopwatch is paused
      clearInterval(intervalId);
    }

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  const formatTime = (timeInSeconds: any) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    timeTaken = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 p-4 md:left-0 md:-translate-x-0">
      <p className='font-bold text-lg'>Time taken: {formatTime(elapsedTime)}</p>
      <div className='flex flex-row gap-4'>
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default StopwatchComponent;
