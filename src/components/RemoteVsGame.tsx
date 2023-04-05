import { useUser } from "@supabase/auth-helpers-react";
import { useGame } from "../hooks/useGame";
import { GameType } from "../hooks/useReactiveGame";
import { Game } from "../pages/Game";
import { updateGame } from "../pages/updateGame";
import { unboxFirstItem } from "../utils/unboxFirstItem";

export function RemoteVsGame() {
  const game = useGame();
  const { yourSession, yourOpponentSession } = useYourSession(game);

  if (!yourSession) {
    return <section>Not your game</section>;
  }

  const isYourTurn = game.active_session_id === yourSession?.id;
  const switchTurn = () => {
    updateGame(game.id, {
      active_session_id: yourOpponentSession.id,
    });
  };

  return (
    <>
      {isYourTurn ? "your turn" : "your opponent's turn"}
      <Game></Game>
      <button
        onClick={() => {
          switchTurn();
        }}
      >
        switch turn
      </button>
    </>
  );
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
