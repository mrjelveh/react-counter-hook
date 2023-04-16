import * as React from 'react';
import useTimer from './useTimer';

export default function App() {
  const { timer, handleStartTimer, handlePauseTimer, handleResetTimer } =
    useTimer(true, 300, 200);

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
