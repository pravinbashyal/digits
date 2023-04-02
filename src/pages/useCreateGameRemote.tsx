import { User, useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { supabaseClient } from "../infra-tools/supabaseClient";
import { unboxFirstItem } from "./unboxFirstItem";

export function useCreateGameRemote() {
  const [isLoading, setIsLoading] = useState(false);
  const [game, setGame] = useState(null);
  const user = useUser();
  const createGame = async () => {
    setIsLoading(true);
    const { data: userSession, error: userSessionCreationError } =
      await supabaseClient
        .from("user_session")
        .insert({
          user_id: user.id,
        })
        .select("id");
    if (userSessionCreationError) {
      console.error({ error: userSessionCreationError });
      return;
    }
    const { id: userSessionId } = unboxFirstItem(userSession);

    const {
      data: games,
      error: gameCreationError,
      statusText,
    } = await supabaseClient
      .from("game")
      .insert({
        user_1_session: userSessionId,
      })
      .select("*");
    console.log({ statusText });
    if (gameCreationError) {
      console.error({ error: gameCreationError });
      return;
    }

    setIsLoading(false);

    const game = unboxFirstItem(games);
    setGame(game);
    return game;
  };
  return {
    game,
    createGame,
    isLoading,
  };
}
