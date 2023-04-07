import { useGameLogic } from "../hooks/useGameLogic";
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
import { useHistoryRemote } from "../hooks/useHistoryRemote";
import { Loading } from "./Loading";

export function RemoteVsGame({
  theNumber,
  game,
  yourSessionId,
  yourOpponentSessionId,
}: {
  theNumber: string;
  game: GameType;
  yourSessionId: number;
  yourOpponentSessionId: number;
}) {
  const { history: yourInitialHistory } = useHistoryRemote(yourSessionId);
  const addToRemoteHistory = useAddToHistory(yourSessionId);
  const { addToHistory, history, resetHistory } =
    useHistory(yourInitialHistory);
  const isYourTurn = game.active_session_id === yourSessionId;
  const switchTurn = () => {
    updateGame(game.id, {
      active_session_id: yourOpponentSessionId,
    });
  };

  const { checkNumber, isCorrectNumber, resetLogic } = useGameLogic(theNumber);

  const restartGame = () => {
    resetLogic();
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
        <OpponentHistory sessionId={yourOpponentSessionId}></OpponentHistory>
      </section>
    </>
  );
}

function useAddToHistory(sessionId: number) {
  const addToHistory = async (history: HistoryItem) => {
    const { data, error } = await supabaseClient.from("history").insert([
      {
        ...localHistoryToRemoteHistory(history),
        session_id: sessionId,
      },
    ]);
    if (error) {
      console.error(error);
    }
  };
  return addToHistory;
}

function OpponentHistory({ sessionId }) {
  console.log({ opponentSessionId: sessionId });
  const { history: yourOpponentInitialHistory, loading } =
    useHistoryRemote(sessionId);
  const { addToHistory: addToOpponentHistory, history: opponentHistory } =
    useHistory(yourOpponentInitialHistory);
  useWatchHistory({
    sessionId: sessionId,
    addToHistory: addToOpponentHistory,
  });

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <section>
      <h3>Opponent</h3>
      <NumbersHistory numbersLog={opponentHistory}></NumbersHistory>
    </section>
  );
}
