import { useSession } from "@supabase/auth-helpers-react";
import { supabaseClient } from "../infra-tools/supabaseClient";
import { SignIn } from "./SignIn";

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
    <SignIn isOpen={true}></SignIn>
  );
}
