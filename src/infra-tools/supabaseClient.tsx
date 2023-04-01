import { createClient } from "@supabase/supabase-js";
import { config } from "./config";
console.log({ config });

export const supabaseClient = createClient(
  config.supabaseUrl,
  config.supabaseKey
);
