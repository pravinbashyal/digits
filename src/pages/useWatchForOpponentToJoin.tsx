import { supabaseClient } from "../infra-tools/supabaseClient";
import { useEffect, useState } from "react";
import { RealtimeChannel } from "@supabase/supabase-js";

export function useWatchForOpponentToJoin(gameId: string) {
  const [joinRequestAccepted, setJoinRequestAccepted] = useState(false);
  let watchGameChanges: RealtimeChannel;
  useEffect(() => {
    watchGameChanges = supabaseClient
      .channel("custom-filter-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "game",
          filter: `game_id=eq.${gameId}`,
        },
        (payload) => {
          console.log({ payload });
          if (payload.new.user_2_session !== null) {
            setJoinRequestAccepted(true);
          }
          watchGameChanges?.unsubscribe();
        }
      )
      .subscribe();
    return () => {
      watchGameChanges.unsubscribe();
    };
  }, []);
  return joinRequestAccepted;
}
