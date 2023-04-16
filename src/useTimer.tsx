import { useState, useRef } from 'react';

// Define the type of object that will be returned from the hook
interface TimerState {
  timer: number;
  handleStartTimer: () => void;
  handlePauseTimer: () => void;
  handleResumeTimer: () => void;
  handleResetTimer: () => void;
}

type CurrentRef = {
  current: string | number | undefined
} | null

// The hook that manages the timer state and related logic
const useTimer = (
  reverse: boolean = false,
  startFrom: number = 0,
  endAt: number = 0
): TimerState => {
  // Create a ref to store the ID of the interval
  const countRef = useRef<string | number | NodeJS.Timeout | undefined>(null);
  // Create a state to store the current timer value
  const [timer, setTimer] = useState(startFrom);

  // checks logic of "startFrom", "endAt" and "reverse"
  const startEndChecker = () => {
    if (reverse) {
      console.error(
        `When reverse is "True", "startFrom" number should be more than "endAt"!`
      );
      return startFrom < endAt;
    } else {
      console.error(
        `When reverse is "False", "startFrom" number should be less than "endAt"!`
      );
      return startFrom > endAt;
    }
  };

  // Function to start the timer
  const handleStartTimer = () => {
    clearInterval(countRef.current!);
    (countRef.current as NodeJS.Timeout) = setInterval(() => {
      if (startEndChecker() || timer === endAt) {
        clearInterval(countRef.current as number);
        return;
      }
      setTimer((prevTimer) => (reverse ? prevTimer - 1 : prevTimer + 1));
    }, 1000);
  };

  // Function to pause the timer
  const handlePauseTimer = () => {
    clearInterval(countRef.current as number);
  };

  // Function to resume the timer
  const handleResumeTimer = () => {
    (countRef.current as NodeJS.Timeout) = setInterval(() => {
      if (startEndChecker() || timer === endAt) {
        clearInterval(countRef.current as number);
        return;
      }
      setTimer((prevTimer) => (reverse ? prevTimer - 1 : prevTimer + 1));
    }, 1000);
  };

  // Function to reset the timer
  const handleResetTimer = () => {
    clearInterval(countRef.current as number);
    setTimer(startFrom);
  };

  // Return the timer state and related functions
  return {
    timer,
    handleStartTimer,
    handlePauseTimer,
    handleResumeTimer,
    handleResetTimer,
  };
};

export default useTimer;
