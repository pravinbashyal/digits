import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import "spectre.css";
import Auth from "./components/SignIn";
import { supabaseClient } from "./infra-tools/supabaseClient";
import { Game } from "./pages/Game";

export default function App() {
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <Auth.UserContextProvider supabaseClient={supabaseClient}>
        <main>
          <section aria-label="top bar">
            <Auth></Auth>
          </section>
          <Game />;
        </main>
      </Auth.UserContextProvider>
    </SessionContextProvider>
  );
}
