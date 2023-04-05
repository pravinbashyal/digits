import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SignIn } from "../components/SignIn";
import { useCreateUserSession } from "../hooks/useCreateUserSession";
import { supabaseClient } from "../infra-tools/supabaseClient";
import { Database } from "../types/supabase";
import { unboxFirstItem } from "../utils/unboxFirstItem";

export function JoinGame() {
  const user = useUser();
  if (!user) return <SignIn />;
  return <JoinGameRoot />;
}

function JoinGameRoot() {
  const { gameId } = useParams();
  const { didJoin, isAlreadyJoined } = useJoinGame(gameId);
  const navigate = useNavigate();
  useEffect(() => {
    if (didJoin || isAlreadyJoined) {
      navigate(`/game/${gameId}`);
    }
  }, [didJoin, isAlreadyJoined]);
  return <section>joining game: {gameId}</section>;
}

function useJoinGame(gameId: string) {
  const user = useUser();
  const [didJoin, setDidJoin] = useState(false);
  const [isAlreadyJoined, setIsAlreadyJoined] = useState(false);
  const { createUserSession } = useCreateUserSession();
  let firstRun = true;
  useEffect(() => {
    if (!firstRun) return;
    firstRun = false;
    const joinGame = async () => {
      const { game } = await gameById(gameId);
      const firstUserSession =
        !Array.isArray(game.first_user_session) && game.first_user_session;
      const isSameUser =
        firstUserSession && firstUserSession.user_id === user.id;
      const hasUser2Session = game.user_2_session;

      if (hasUser2Session) {
        setIsAlreadyJoined(true);
      }
      if (isSameUser || hasUser2Session) {
        return;
      }

      const { id: userSessionId } = await createUserSession();
      const { error: gameUpdateError } = await updateGame(game.id, {
        user_2_session: userSessionId,
        active_session_id: game.user_1_session,
      });
      if (gameUpdateError) {
        console.error(gameUpdateError.message);
        return;
      }
      setDidJoin(true);
    };
    joinGame();
  }, []);
  return { didJoin, isAlreadyJoined };
}

async function gameById(gameId: string) {
  const { data, error } = await supabaseClient
    .from("game")
    .select(
      `
          game_id,
          id,
          first_user_session:user_session!game_user_1_session_fkey (
            *
          ),
            user_1_session,
            user_2_session
          `
    )
    .eq("game_id", gameId);
  const game = unboxFirstItem(data);
  return { game, error };
}

async function updateGame(
  id: number,
  partial: Partial<Database["public"]["Tables"]["game"]["Row"]>
) {
  const { data, error } = await supabaseClient
    .from("game")
    .update(partial)
    .eq("id", id)
    .select("*");
  return { game: unboxFirstItem(data), error };
}
