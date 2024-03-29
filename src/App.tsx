import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Auth as SupaAuth } from "@supabase/auth-ui-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "spectre.css";
import { Auth } from "./components/Auth";
import { CreateDoublePlayerGame } from "./pages/CreateDoublePlayerGame";
import { supabaseClient } from "./infra-tools/supabaseClient";
import { SinglePlayerGame } from "./pages/SinglePlayerGame";
import { Landing } from "./pages/Landing";
import { DoublePlayerGame } from "./pages/DoublePlayerGame";
import { JoinGame } from "./pages/JoinGame";

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
              <Route
                path="/single-player"
                element={<SinglePlayerGame />}
              ></Route>
              <Route
                path="/double-player"
                element={<CreateDoublePlayerGame />}
              ></Route>
              <Route path="/game/:id" element={<DoublePlayerGame />}></Route>
              <Route path="/join-game/:gameId" element={<JoinGame />}></Route>
            </Routes>
          </BrowserRouter>
        </main>
      </SupaAuth.UserContextProvider>
    </SessionContextProvider>
  );
}
