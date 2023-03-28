import React from "react";
import { useTimer } from "../hooks/useTimer";

export function Timer() {
  const { secondsPassed } = useTimer();
  const { minutes, seconds } = formattedTime(secondsPassed);
  return (
    <section
      style={{
        width: "80px",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <time>
        {minutes}:{seconds}
      </time>
    </section>
  );
}

const formattedTime = (
  timeInSeconds: number
): { minutes: string; seconds: string } => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return {
    minutes: doubleDigited(minutes),
    seconds: doubleDigited(seconds),
  };
};

const doubleDigited = (timeCount: number): string => {
  if (String(timeCount).length === 1) return `0${timeCount}`;
  return String(timeCount);
};
