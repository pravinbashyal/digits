import { PostgrestError, RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabaseClient } from "../infra-tools/supabaseClient";
import { Database } from "../types/supabase";
import { unboxFirstItem } from "../utils/unboxFirstItem";

export type Game = Database["public"]["Tables"]["game"]["Row"];

export function useReactiveGame(gameId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [watchEvents, setWatchEvents] = useState<
    Array<(item: Partial<Game>) => void>
  >([]);

  const addWatchFor = (eventCallback: (item: Game) => void) => {
    setWatchEvents((prev) => [...prev, eventCallback]);
  };

  let watchGameChanges: RealtimeChannel;
  useEffect(() => {
    console.log({ watchGameChanges });
    if (watchGameChanges) return;
    watchGameChanges = supabaseClient
      .channel("game-update-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "game",
          filter: `game_id=eq.${gameId}`,
        },
        (payload) => {
          const updatedGame = payload.new as Game;
          console.log({ game, updatedGame });
          setGame(updatedGame);
          watchEvents.forEach((watchEvents) => watchEvents(updatedGame));
        }
      )
      .subscribe();
    return () => {
      watchGameChanges.unsubscribe();
      watchGameChanges = undefined;
    };
  }, []);

  useEffect(() => {
    const fetchGame = async () => {
      setLoading(true);
      const { data: game, error } = await supabaseClient
        .from("game")
        .select("*")

        // Filters
        .eq("game_id", gameId);
      setLoading(false);
      if (error) {
        setError(error);
        return;
      }
      setGame(unboxFirstItem(game));
    };
    fetchGame();
  }, [gameId]);
  return { addWatchFor, game, loading, error };
}
