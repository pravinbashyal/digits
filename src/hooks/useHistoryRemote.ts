import { useEffect, useState } from "react";
import { supabaseClient } from "../infra-tools/supabaseClient";
import { HistoryItem } from "./useHistory";
import { remoteHistoryToLocalHistory } from "./useWatchHistory";

export function useHistoryRemote(sessionId: number) {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Array<HistoryItem>>([]);

  let fetchRequestSent = false;
  useEffect(() => {
    if (fetchRequestSent) return;
    fetchRequestSent = true;
    setLoading(true);
    const fetch = async (sessionId: number) => {
      const { data, error } = await supabaseClient
        .from("history")
        .select("*")
        .eq("session_id", sessionId);
      if (error) {
        console.error(error);
        return;
      }
      setHistory(data.map(remoteHistoryToLocalHistory));
      setLoading(false);
    };
    fetch(sessionId);
  }, []);
  return { loading, history };
}
