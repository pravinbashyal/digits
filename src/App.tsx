import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Auth as SupaAuth } from "@supabase/auth-ui-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "spectre.css";
import { Auth } from "./components/SignIn";
import { supabaseClient } from "./infra-tools/supabaseClient";
import { Game } from "./pages/Game";
import { Landing } from "./pages/Landing";

export default function App() {
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <SupaAuth.UserContextProvider supabaseClient={supabaseClient}>
        <main>
          <section aria-label="top bar">
            <Auth></Auth>
          </section>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />}></Route>
              <Route path="/single-player" element={<Game />}></Route>
              <Route path="/double-player" element={<Game />}></Route>
            </Routes>
          </BrowserRouter>
        </main>
      </SupaAuth.UserContextProvider>
    </SessionContextProvider>
  );
}
