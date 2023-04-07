import { User } from "@supabase/auth-helpers-react";
import { GameType } from "../hooks/useReactiveGame";
import { unboxFirstItem } from "../utils/unboxFirstItem";

export function identifySessions(
  game: GameType,
  user: User
): {
  yourSessionId?: number;
  yourOpponentSessionId?: number;
  yourSession?: { id: number; user_id: string; the_number: string };
} {
  const yourSession =
    unboxFirstItem(
      [game.first_user_session, game.second_user_session].filter(
        (session) => session?.user_id === user.id
      )
    ) || null;
  if (!yourSession) return {};
  const yourOpponentSessionId = unboxFirstItem(
    [game.user_1_session, game.user_2_session].filter(
      (sessionId) => sessionId !== yourSession.id
    )
  );
  return {
    yourSessionId: yourSession?.id,
    yourOpponentSessionId: yourOpponentSessionId,
    yourSession,
  };
}
