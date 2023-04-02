import { useUser } from "@supabase/auth-helpers-react";
import { SignIn } from "../components/SignIn";
import { useCreateGameRemote } from "./useCreateGameRemote";

export function DoublePlayer() {
  const user = useUser();

  if (!user)
    return (
      <section>
        <h2>Please sign in to create a game</h2>
        <SignIn />;
      </section>
    );

  return (
    <section>
      <h2>Create Game</h2>
      <CreateGameForm></CreateGameForm>
    </section>
  );
}

function CreateGameForm() {
  const { game, createGame } = useCreateGameRemote();
  return game ? (
    <section>{game.game_id}</section>
  ) : (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createGame();
      }}
    >
      <button type="submit">Create Game</button>
    </form>
  );
}
