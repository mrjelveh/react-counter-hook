# React Timer Hook

This is a custom hook for managing a timer in a React application. The `useTimer` hook allows you to define the mode of the counter (forward or reverse), the starting value, the end value, and the interval duration.

## Installation
```
npm install react-counter-hook
```

## Usage
```jsx
import useTimer from 'react-counter-hook';
...
const MyComponent = () => {
  const { timer, handleStartTimer, handlePauseTimer, handleResetTimer } = useTimer(true, 100, 0);

  React.useEffect(() => {
    handleStartTimer();
    return () => {
      handlePauseTimer();
    };
  }, [handleStartTimer, handlePauseTimer]);
  
  return (
    <div>
      <h1>{new Date(timer * 1000).toISOString().substring(11, 19)}</h1>
      <button onClick={handlePauseTimer}>Pause</button>
      <button onClick={handleResetTimer}>Reset</button>
      <button onClick={handleStartTimer}>start</button>
    </div>
  );
}
```

## Parameters
The `useTimer` hook accepts four optional parameters:

- `reverse` *(boolean)*: If `true`, the timer will count down from the `endAt` value to the `startFrom` value. Default is `false`.
- `startFrom` *(number)*: The timer will start from this value. Default is `0`.
- `endAt` *(number)*: The timer will stop at this value. Default is `0`.
- `intervalDuration` *(number)*: The duration of each interval in milliseconds. Default is `1000`.

## Return Value
The `useTimer` hook returns an object with the following properties and methods:

- `timer` *(number)*: The current value of the timer.
- `handleStartTimer` *(function)*: Function to start the timer.
- `handlePauseTimer` *(function)*: Function to pause the timer.
- `handleResumeTimer` *(function)*: Function to resume the timer.
- `handleResetTimer` *(function)*: Function to reset the timer to its initial value.

Thanks for using this hook!