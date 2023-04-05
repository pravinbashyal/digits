import { useUser } from "@supabase/auth-helpers-react";
import { useGame } from "../hooks/useGame";
import { GameType } from "../hooks/useReactiveGame";
import { Game } from "../pages/Game";
import { unboxFirstItem } from "../utils/unboxFirstItem";

export function RemoteVsGame() {
  const game = useGame();
  const yourSession = useYourSession(game);
  console.log({ yourSession, active_session: game.active_session_id });
  if (!yourSession) {
    return <section>Not your game</section>;
  }
  const isYourTurn = game.active_session_id === yourSession?.id;
  return (
    <>
      {isYourTurn ? "your turn" : "your opponent's turn"}
      <Game></Game>
    </>
  );
}

function useYourSession(
  game: GameType
): { id: number; user_id: string } | null {
  const user = useUser();
  return (
    unboxFirstItem(
      [game.first_user_session, game.second_user_session].filter(
        (session) => session?.user_id === user.id
      )
    ) || null
  );
}
