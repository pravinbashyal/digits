import { Loading } from "../components/Loading";
import { useParams } from "react-router-dom";
import { CopyToClipboard } from "../components/CopyToClipboard";
import { Game } from "./Game";
import { useFetchGame } from "../hooks/useFetchGame";
import { useWatchForOpponentToJoin } from "./useWatchForOpponentToJoin";

export function DoublePlayerGame() {
  const { id } = useParams();
  const { game, loading: loadingGame, error: gameLoadError } = useFetchGame(id);

  let bothUsersAlreadyPresent = Boolean(game?.user_2_session);

  if (loadingGame) {
    return <Loading></Loading>;
  }

  if (gameLoadError) {
    return <p>{gameLoadError?.message}</p>;
  }

  if (!game) {
    return <p>game doesnt exist</p>;
  }

  if (!bothUsersAlreadyPresent) {
    return <WaitingToJoin gameId={game.game_id} />;
  }

  return <Game />;
}

function WaitingToJoin({ gameId }: { gameId: string | null }) {
  useWatchForOpponentToJoin(gameId);

  return (
    <section>
      <h3>invite to this game</h3>
      <CopyToClipboard text={`http://localhost:5174/join-game/${gameId}`} />

      <p>waiting for opponent to join</p>
      <Loading></Loading>
    </section>
  );
}
