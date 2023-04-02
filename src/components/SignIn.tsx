import { useSession } from "@supabase/auth-helpers-react";
import { Auth as SupaAuth } from "@supabase/auth-ui-react";
import { useState } from "react";
import { supabaseClient } from "../infra-tools/supabaseClient";

export function Auth() {
  const session = useSession();
  const user = session?.user;
  const signOut = () => {
    supabaseClient.auth.signOut();
  };
  return session ? (
    <section>
      <p>{user.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </section>
  ) : (
    <SignIn></SignIn>
  );
}

function SignIn() {
  const [openSigninModal, setOpenSigninModal] = useState(false);
  return openSigninModal ? (
    <SupaAuth supabaseClient={supabaseClient} providers={["google"]} />
  ) : (
    <button onClick={() => setOpenSigninModal(true)}>Sign In</button>
  );
}
