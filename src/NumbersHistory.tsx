import React from "react";
import { borderStyle } from "./styles";
import { NumberLog } from "./useGameLogic";

export const NumbersHistory = ({ numbersLog }: { numbersLog: NumberLog[] }) => (
  <>
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
      <section style={styles.gridRow}>
        <p>number</p>
        <p>correct digits</p>
        <p>correct positions</p>
      </section>

      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {numbersLog.map((aNumberLog) => (
          <li key={aNumberLog.number} style={styles.gridRow}>
            <p style={styles.logItem}>{aNumberLog.number}</p>
            <p style={styles.logItem}> {aNumberLog.correctDigitCount}</p>
            <p style={{ paddingLeft: "0.25rem" }}>
              {aNumberLog.correctPositionCount}
            </p>
          </li>
        ))}
      </ul>
    </section>
  </>
);

const styles = {
  gridRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    alignItems: "center",
    justifyItems: "start",
  },
  logItem: { paddingLeft: "0.25rem" },
};
