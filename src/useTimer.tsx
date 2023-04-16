import { useState, useRef, MutableRefObject } from "react";

// Define the properties and methods returned by the hook
interface TimerState {
  timer: number;
  handleStartTimer: () => void;
  handlePauseTimer: () => void;
  handleResumeTimer: () => void;
  handleResetTimer: () => void;
}

/**
 * React counter hook to manage a timer
 * @param reverse for reverse mode, the timer will count down from the end value to the start value
 * @param startFrom the timer will start from this value
 * @param endAt the timer will stop at this value
 * @param intervalDuration it is the duration of each interval in milliseconds
 * @returns the timer state
 */
// Define the hook function with optional parameters and default values
const useTimer = (
  reverse = false,
  startFrom = 0,
  endAt = 0,
  intervalDuration = 1000 // The duration of each interval in milliseconds
): TimerState => {
  const countRef = useRef<NodeJS.Timeout | undefined>(); // Reference to the interval ID
  const [timer, setTimer] = useState(startFrom); // The timer value

  // Check if the start and end values are valid for the chosen mode (reverse/forward)
  const startEndChecker = () => {
    if ((reverse && startFrom < endAt) || (!reverse && startFrom > endAt)) {
      console.error(
        `React-counter-hook: Invalid start/end values for ${
          reverse ? "reverse" : "forward"
        } mode`
      );
      return true; // Return true if the values are invalid
    }
    return false; // Return false if the values are valid
  };

  // Function to start the timer
  const handleStartTimer = () => {
    clearInterval(countRef.current); // Clear any previous intervals
    countRef.current = setInterval(() => {
      if (startEndChecker() || timer === endAt) {
        // If the start/end values are invalid or the end value is reached, stop the timer
        clearInterval(countRef.current);
      } else {
        // Otherwise, update the timer value based on the chosen mode
        setTimer((prevTimer) => (reverse ? prevTimer - 1 : prevTimer + 1));
      }
    }, intervalDuration); // Set the interval duration
  };

  // Function to pause the timer
  const handlePauseTimer = () => {
    clearInterval(countRef.current); // Clear the current interval
  };

  // Function to resume the timer
  const handleResumeTimer = () => {
    // Set a new interval to update the timer value
    countRef.current = setInterval(() => {
      if (startEndChecker() || timer === endAt) {
        // If the start/end values are invalid or the end value is reached, stop the timer
        clearInterval(countRef.current);
      } else {
        // Otherwise, update the timer value based on the chosen mode
        setTimer((prevTimer) => (reverse ? prevTimer - 1 : prevTimer + 1));
      }
    }, intervalDuration); // Set the interval duration
  };

  // Function to reset the timer to its initial value
  const handleResetTimer = () => {
    clearInterval(countRef.current); // Clear the current interval
    setTimer(startFrom); // Reset the timer value to the starting value
  };

  // Return the timer state object with all its properties and methods
  return {
    timer,
    handleStartTimer,
    handlePauseTimer,
    handleResumeTimer,
    handleResetTimer,
  };
};

export default useTimer; // Export the hook function as the default export
