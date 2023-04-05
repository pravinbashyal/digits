import { supabaseClient } from "../infra-tools/supabaseClient";
import { Database } from "../types/supabase";
import { unboxFirstItem } from "../utils/unboxFirstItem";

export async function updateGame(
  id: number,
  partial: Partial<Database["public"]["Tables"]["game"]["Row"]>
) {
  const { data, error } = await supabaseClient
    .from("game")
    .update(partial)
    .eq("id", id)
    .select("*");
  return { game: unboxFirstItem(data), error };
}
