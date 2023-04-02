import { Loading } from "../components/Loading";
import { useParams, useSearchParams } from "react-router-dom";
import { supabaseClient } from "../infra-tools/supabaseClient";
import { useEffect, useState } from "react";
import { Database } from "../types/supabase";
import { CopyToClipboard } from "../components/CopyToClipboard";
import { unboxFirstItem } from "./unboxFirstItem";
import { PostgrestError } from "@supabase/supabase-js";

export function DoublePlayerGame() {
  const { id } = useParams();
  const { invite } = useSearchParams();
  const { game, loading, error } = useFetchGame(id);
  function useJoinGame(id) {
    const user = useUser();
  }

  const { joinGame, loading, error } = useJoinGame(id);

  if (invite) {
    joinGame();
  }

  if (loading) {
    return <Loading></Loading>;
  }

  if (error) {
    return <p>{error?.message}</p>;
  }

  if (!game) {
    return <p>game doesnt exist</p>;
  }

  return (
    <section>
      {game && !game.user_2_session ? (
        <section>
          <h3></h3>
          invite to this game
          <CopyToClipboard
            text={`http://localhost:5174/game/${game.game_id}?invite=true`}
          />
          <p>waiting for opponent to join</p>
          <Loading></Loading>
        </section>
      ) : null}
    </section>
  );
}

function useFetchGame(id: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [game, setGame] =
    useState<Database["public"]["Tables"]["game"]["Row"]>(null);
  useEffect(() => {
    const fetchGame = async () => {
      setLoading(true);
      const { data: game, error } = await supabaseClient
        .from("game")
        .select("*")

        // Filters
        .eq("game_id", id);
      setLoading(false);
      if (error) {
        setError(error);
        return;
      }
      console.log({ game, error });
      setGame(unboxFirstItem(game));
    };
    fetchGame();
  }, [id]);
  return { game, loading, error };
}