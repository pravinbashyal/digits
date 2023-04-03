import { supabaseClient } from "../infra-tools/supabaseClient";
import { useEffect, useState } from "react";
import { Database } from "../types/supabase";
import { unboxFirstItem } from "../pages/unboxFirstItem";
import { PostgrestError } from "@supabase/supabase-js";

export function useFetchGame(id: string) {
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
      setGame(unboxFirstItem(game));
    };
    fetchGame();
  }, [id]);
  return { game, loading, error };
}
