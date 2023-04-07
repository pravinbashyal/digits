import { useUser } from "@supabase/auth-helpers-react";
import { useRef } from "react";
import { useGame } from "../hooks/useGame";
import { useGameLogic } from "../hooks/useGameLogic";
import { generateUniqueRandomNumberOf } from "../hooks/generateUniqueRandomNumberOf";
import { numberLength } from "../hooks/useNumber";
import { useNumbersHistory } from "../hooks/useNumbersHistory";
import { GameType } from "../hooks/useReactiveGame";
import { useWatchHistory } from "../hooks/useWatchHistory";
import { supabaseClient } from "../infra-tools/supabaseClient";
import { GameRoot } from "../pages/GameRoot";
import { updateGame } from "../pages/updateGame";
import { unboxFirstItem } from "../utils/unboxFirstItem";

export function RemoteVsGame() {
  const game = useGame();
  const { yourSession, yourOpponentSession } = useYourSession(game);
  useWatchHistory(yourOpponentSession.id);
  const addToHistory = useAddToHistory(yourSession.id);

  if (!yourSession) {
    return <section>Not your game</section>;
  }

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
  const { addToNumberHistory, numbersHistory, resetHistory } =
    useNumbersHistory();

  const restartGame = () => {
    resetLogic();
    generateNewNumber();
    resetHistory();
  };

  return (
    <>
      {isYourTurn ? "your turn" : "your opponent's turn"}
      <GameRoot
        isCorrectNumber={isCorrectNumber}
        numbersHistory={numbersHistory}
        onSubmitNumber={(splittedNumber: string[]) => {
          const numberCheckResult = checkNumber(splittedNumber);
          addToNumberHistory({
            ...numberCheckResult,
            number: splittedNumber.join(""),
          });
          addToHistory({
            guessed_number: splittedNumber.join(""),
          });
          switchTurn();
        }}
        onRestartGame={restartGame}
      ></GameRoot>
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

function useYourSession(game: GameType): {
  yourSession?: { id: number; user_id: string };
  yourOpponentSession?: { id: number; user_id: string };
} {
  const user = useUser();
  const yourSession =
    unboxFirstItem(
      [game.first_user_session, game.second_user_session].filter(
        (session) => session?.user_id === user.id
      )
    ) || null;
  if (!yourSession) return {};
  const yourOpponentSession = unboxFirstItem(
    [game.first_user_session, game.second_user_session].filter(
      (session) => session?.id !== yourSession.id
    )
  );
  return {
    yourSession,
    yourOpponentSession,
  };
}

function useAddToHistory(sessionId: number) {
  const addToHistory = async (history: any) => {
    const { data, error } = await supabaseClient.from("history").insert([
      {
        ...history,
        session_id: sessionId,
      },
    ]);
    console.log({ data, error });
  };
  return addToHistory;
}
