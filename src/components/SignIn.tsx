import { Auth as SupaAuth } from "@supabase/auth-ui-react";
import { useState } from "react";
import { supabaseClient } from "../infra-tools/supabaseClient";

export function SignIn({ isOpen = false }: { isOpen?: boolean }) {
  const [openSigninModal, setOpenSigninModal] = useState(isOpen);
  return openSigninModal ? (
    <SupaAuth supabaseClient={supabaseClient} providers={["google"]} />
  ) : (
    <button onClick={() => setOpenSigninModal(true)}>Sign In</button>
  );
}
