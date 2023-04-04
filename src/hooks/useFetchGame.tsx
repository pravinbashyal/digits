import { supabaseClient } from "../infra-tools/supabaseClient";
import { useEffect, useState } from "react";
import { Database } from "../types/supabase";
import { unboxFirstItem } from "../pages/unboxFirstItem";
import { PostgrestError, RealtimeChannel } from "@supabase/supabase-js";

export function useReactiveFetchGame(id: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [game, setGame] =
    useState<Database["public"]["Tables"]["game"]["Row"]>(null);
  let watchGameChanges: RealtimeChannel;

  useEffect(() => {
    if (watchGameChanges) return;
    watchGameChanges = supabaseClient
      .channel("custom-filter-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "game",
          filter: `game_id=eq.${id}`,
        },
        (payload) => {
          console.log({ payload });
          setGame(payload.new as any);
        }
      )
      .subscribe();
    return () => {
      watchGameChanges.unsubscribe();
    };
  }, []);

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
      setGame(unboxFirstItem(game));
    };
    fetchGame();
  }, [id]);
  return { game, loading, error };
}
