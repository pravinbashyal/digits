import { useState } from "react";
import { supabaseClient } from "../infra-tools/supabaseClient";
import { unboxFirstItem } from "./unboxFirstItem";
import { useCreateUserSession } from "../hooks/useCreateUserSession";

export function useCreateGameRemote() {
  const [isLoading, setIsLoading] = useState(false);
  const [game, setGame] = useState(null);
  const { createUserSession } = useCreateUserSession();
  const createGame = async () => {
    setIsLoading(true);
    const userSession = await createUserSession();
    const { id: userSessionId } = userSession;
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
