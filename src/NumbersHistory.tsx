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
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          alignItems: "center",
          justifyItems: "start",
        }}
      >
        <p>number</p>
        <p>correct digits</p>
        <p>correct numbers</p>
      </section>
      {numbersLog.map((aNumberLog, index) => (
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          <li
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              alignItems: "center",
              justifyItems: "start",
            }}
          >
            <p style={{ paddingLeft: "0.25rem" }}>{aNumberLog.number}</p>
            <p style={{ paddingLeft: "0.25rem" }}>
              {" "}
              {aNumberLog.correctDigitCount}
            </p>
            <p style={{ paddingLeft: "0.25rem" }}>
              {aNumberLog.correctPositionCount}
            </p>
          </li>
        </ul>
      ))}
    </section>
  </aside>
);
