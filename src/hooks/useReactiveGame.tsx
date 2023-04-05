import { PostgrestError, RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabaseClient } from "../infra-tools/supabaseClient";
import { Database } from "../types/supabase";
import { unboxFirstItem } from "../utils/unboxFirstItem";

export type GameType = Database["public"]["Tables"]["game"]["Row"] & {
  first_user_session?: {
    id: number;
    user_id: string;
  };
  second_user_session?: {
    id: number;
    user_id: string;
  };
};

export function useReactiveGame(gameId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [game, setGame] = useState<GameType | null>(null);
  const [watchEvents, setWatchEvents] = useState<
    Array<(item: Partial<GameType>) => void>
  >([]);

  const addWatchFor = (eventCallback: (item: GameType) => void) => {
    setWatchEvents((prev) => [...prev, eventCallback]);
  };

  let watchGameChanges: RealtimeChannel;
  useEffect(() => {
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
          const updatedGame = payload.new as GameType;
          setGame((prev) => ({
            ...prev,
            ...updatedGame,
          }));
          watchEvents.forEach((watchEvents) => watchEvents(updatedGame));
        }
      )
      .subscribe();
    return () => {
      watchGameChanges.unsubscribe();
      watchGameChanges = undefined;
    };
  }, []);

  let isFetched = false;
  useEffect(() => {
    if (isFetched) return;
    isFetched = true;
    const fetchGame = async () => {
      setLoading(true);
      const { data: game, error } = await supabaseClient
        .from("game")
        .select(
          `
          *,
          first_user_session:user_session!game_user_1_session_fkey (
            id,
            user_id
          ),
            second_user_session:user_session!game_user_2_session_fkey (
              id,
              user_id
            )
          `
        )

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
