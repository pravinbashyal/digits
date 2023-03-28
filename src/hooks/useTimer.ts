import { useState, useEffect } from "react";

export function useTimer() {
  const [secondsPassed, setSecondsPassed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimer = () => {
    setIsPaused(true);
  };
  const resumeTimer = () => {
    setIsPaused(false);
  };
  const resetTimer = () => {
    setIsPaused(true);
    setSecondsPassed(0);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused) return;
      setSecondsPassed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);
  return { secondsPassed, pauseTimer, resumeTimer, isPaused, resetTimer };
}
