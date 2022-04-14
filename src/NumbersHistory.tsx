import React from "react";
import { borderStyle } from "./styles";
import { NumberLog } from "./useGameLogic";

export const NumbersHistory = ({ numbersLog }: { numbersLog: NumberLog[] }) => (
  <aside
    style={{
      padding: "1rem",
      borderLeft: borderStyle,
      height: "100%",
      flex: "2",
    }}
  >
    <h2
      style={{
        borderBottom: borderStyle,
        marginLeft: "-1rem",
        marginRight: "-1rem",
      }}
    >
      Number History
    </h2>
    <section>
      {numbersLog.map((aNumberLog, index) => (
        <ul>
          <li key={index}>
            <p>{aNumberLog.number}</p>
            <p>{aNumberLog.correctDigitCount}</p>
            <p>{aNumberLog.correctPositionCount}</p>
          </li>
        </ul>
      ))}
    </section>
  </aside>
);
