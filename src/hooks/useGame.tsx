import { createContext, ReactNode, useContext } from "react";
import { GameType as GameType } from "./useReactiveGame";

const GameContext = createContext<GameType>(null);

export const GameProvider = ({
  children,
  game,
}: {
  children: ReactNode;
  game: GameType;
}) => {
  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const game = useContext(GameContext);
  if (!game) {
    throw new Error(
      "cannot use useGameEventBus outside of GameEventBus context"
    );
  }
  return game;
};
