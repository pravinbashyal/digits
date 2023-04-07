import { Loading } from "../components/Loading";
import { useParams } from "react-router-dom";
import { CopyToClipboard } from "../components/CopyToClipboard";
import { RemoteVsGame } from "../components/RemoteVsGame";
import { useReactiveGame } from "../hooks/useReactiveGame";
import { GameProvider } from "../hooks/useGame";
import { identifySessions } from "../components/identifySessions";
import { useUser } from "@supabase/auth-helpers-react";

export function DoublePlayerGame() {
  const { id } = useParams();
  const { game, loading, error } = useReactiveGame(id);
  const user = useUser();

  if (loading) {
    return <Loading></Loading>;
  }

  if (!game) {
    return <p>game doesnt exist</p>;
  }

  const { yourSessionId, yourOpponentSessionId, yourSession } =
    identifySessions(game, user);

  if (!yourSessionId) {
    return <section>Not your game</section>;
  }

  if (error) {
    return <p>{error?.message}</p>;
  }

  if (!game.user_2_session) {
    return <WaitingToJoin gameId={game.game_id} />;
  }

  return (
    <GameProvider game={game}>
      <RemoteVsGame
        {...{
          theNumber: yourSession.the_number,
          game,
          yourSessionId,
          yourOpponentSessionId,
        }}
      />
    </GameProvider>
  );
}

function WaitingToJoin({ gameId }: { gameId: string | null }) {
  return (
    <section>
      <h3>invite to this game</h3>
      <CopyToClipboard text={invitationUrl(gameId)} />

      <p>waiting for opponent to join</p>
      <Loading></Loading>
    </section>
  );
}

const invitationUrl = (gameId: string) =>
  `${window.origin}/join-game/${gameId}`;
