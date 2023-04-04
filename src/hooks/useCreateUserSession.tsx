import { useUser } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { useState } from "react";
import { supabaseClient } from "../infra-tools/supabaseClient";
import { unboxFirstItem } from "../utils/unboxFirstItem";

export function useCreateUserSession() {
  const user = useUser();
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState(false);
  const createUserSession = async () => {
    setLoading(true);
    const { data: userSession, error: userSessionCreationError } =
      await supabaseClient
        .from("user_session")
        .insert({
          user_id: user.id,
        })
        .select("*");
    setLoading(false);
    if (userSessionCreationError) {
      setError(userSessionCreationError);
      return;
    }
    return unboxFirstItem(userSession);
  };
  return { error, loading, createUserSession };
}
