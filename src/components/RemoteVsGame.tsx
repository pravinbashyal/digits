import { useRef } from "react";
import { useGameLogic } from "../hooks/useGameLogic";
import { generateUniqueRandomNumberOf } from "../utils/generateUniqueRandomNumberOf";
import { numberLength } from "../hooks/useNumber";
import { HistoryItem, useHistory } from "../hooks/useHistory";
import { GameType } from "../hooks/useReactiveGame";
import { supabaseClient } from "../infra-tools/supabaseClient";
import { GameRoot } from "./GameRoot";
import { updateGame } from "../pages/updateGame";
import { NumbersHistory } from "./NumbersHistory";
import {
  localHistoryToRemoteHistory,
  useWatchHistory,
} from "../hooks/useWatchHistory";

export function RemoteVsGame({
  game,
  yourSession,
  yourOpponentSession,
}: {
  game: GameType;
  yourSession: any;
  yourOpponentSession: any;
}) {
  const addToRemoteHistory = useAddToHistory(yourSession.id);
  const { addToHistory, history, resetHistory } = useHistory();
  const { addToHistory: addToOpponentHistory, history: opponentHistory } =
    useHistory();
  useWatchHistory({
    sessionId: yourOpponentSession.id,
    addToHistory: addToOpponentHistory,
  });
  const isYourTurn = game.active_session_id === yourSession?.id;
  const switchTurn = () => {
    updateGame(game.id, {
      active_session_id: yourOpponentSession.id,
    });
  };

  const { generatedNumber, generateNewNumber } = numberGenerator();
  const { checkNumber, isCorrectNumber, resetLogic } = useGameLogic(
    generatedNumber.current
  );

  const restartGame = () => {
    resetLogic();
    generateNewNumber();
    resetHistory();
  };

  return (
    <>
      {isYourTurn ? "your turn" : "your opponent's turn"}
      <section style={{ display: "flex" }}>
        <GameRoot
          isCorrectNumber={isCorrectNumber}
          numbersHistory={history}
          onSubmitNumber={(splittedNumber: string[]) => {
            const numberCheckResult = checkNumber(splittedNumber);
            const historyItem = {
              ...numberCheckResult,
              number: splittedNumber.join(""),
            };
            addToHistory(historyItem);
            addToRemoteHistory(historyItem);
            switchTurn();
          }}
          onRestartGame={restartGame}
        ></GameRoot>
        <section>
          <h3>Opponent</h3>
          <NumbersHistory numbersLog={opponentHistory}></NumbersHistory>
        </section>
      </section>
    </>
  );
}

function numberGenerator() {
  function generateNumber() {
    return generateUniqueRandomNumberOf({
      length: numberLength,
    });
  }
  const generatedNumber = useRef<string>();
  if (!generatedNumber.current) {
    generatedNumber.current = generateNumber();
  }
  const generateNewNumber = () => {
    generatedNumber.current = generateNumber();
    return generatedNumber;
  };
  return { generatedNumber, generateNewNumber };
}

function useAddToHistory(sessionId: number) {
  const addToHistory = async (history: HistoryItem) => {
    const { data, error } = await supabaseClient.from("history").insert([
      {
        ...localHistoryToRemoteHistory(history),
        session_id: sessionId,
      },
    ]);
    console.log({ data, error });
  };
  return addToHistory;
}
