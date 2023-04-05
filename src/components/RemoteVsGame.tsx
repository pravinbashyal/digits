import { Game } from "../pages/Game";
import { Database } from "../types/supabase";

export function RemoteVsGame() {
  // const useWatchYourTurn = () => {
  //   const watchTurnSwitch = supabaseClient
  //     .channel("custom-filter-channel")
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "UPDATE",
  //         schema: "public",
  //         table: "game",
  //         filter: `game_id=eq.${gameId}`,
  //       },
  //       (payload) => {}
  //     )
  //     .subscribe();
  // };
  let isYourTurn = true;
  return (
    <>
      {isYourTurn ? "your turn" : "your opponent's turn"}
      <Game></Game>
    </>
  );
}
