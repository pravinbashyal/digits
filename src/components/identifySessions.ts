import { User } from "@supabase/auth-helpers-react";
import { GameType } from "../hooks/useReactiveGame";
import { unboxFirstItem } from "../utils/unboxFirstItem";

export function identifySessions(
  game: GameType,
  user: User
): {
  yourSession?: { id: number; user_id: string };
  yourOpponentSession?: { id: number; user_id: string };
} {
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
