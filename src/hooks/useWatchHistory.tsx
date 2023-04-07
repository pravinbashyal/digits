import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect } from "react";
import { supabaseClient } from "../infra-tools/supabaseClient";
import { Database } from "../types/supabase";
import { HistoryItem } from "./useHistory";

type RemoteHistory = Database["public"]["Tables"]["history"]["Row"];

export function useWatchHistory({
  sessionId,
  addToHistory,
}: {
  sessionId: number;
  addToHistory: (history: HistoryItem) => void;
}) {
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
          addToHistory(
            remoteHistoryToLocalHistory(payload.new as RemoteHistory)
          );
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
}

export const remoteHistoryToLocalHistory = (
  remoteHistory: RemoteHistory
): HistoryItem => {
  return {
    number: remoteHistory.number,
    correctDigitCount: remoteHistory.correct_digit_count,
    correctPositionCount: remoteHistory.correct_position_count,
  };
};

export const localHistoryToRemoteHistory = (
  history: HistoryItem
): Pick<
  RemoteHistory,
  "correct_digit_count" | "correct_position_count" | "number"
> => {
  return {
    number: history.number,
    correct_digit_count: history.correctDigitCount,
    correct_position_count: history.correctPositionCount,
  };
};
