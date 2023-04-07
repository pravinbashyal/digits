import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect } from "react";
import { supabaseClient } from "../infra-tools/supabaseClient";

export function useWatchHistory(sessionId: number) {
  let subscription: RealtimeChannel;

  useEffect(() => {
    if (subscription) return;
    subscription = supabaseClient
      .channel("changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "history",
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          console.log(
            `Change detected in Table 1 for Table 2 row with id '${sessionId}':`,
            payload
          );
        }
      )
      .subscribe();
    return () => {
      subscription.unsubscribe();
      subscription = undefined;
    };
  }, [sessionId]);

  return subscription;
}
