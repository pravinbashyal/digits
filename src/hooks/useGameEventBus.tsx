import { createContext, ReactNode, useContext } from "react";
import { Game } from "./useReactiveGame";

const GameEventBus = createContext(null);

export const GameEventBusProvider = ({
  children,
  addWatchFor,
}: {
  children: ReactNode;
  addWatchFor: (eventCallback: (updatedGame: Game) => void) => void;
}) => {
  return (
    <GameEventBus.Provider value={addWatchFor}>
      {children}
    </GameEventBus.Provider>
  );
};

export const useGameEventBus = () => {
  const addWatch = useContext(GameEventBus);
  if (!addWatch) {
    throw new Error(
      "cannot use useGameEventBus outside of GameEventBus context"
    );
  }
  return addWatch;
};
