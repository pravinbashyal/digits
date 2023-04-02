import { useNavigate } from "react-router-dom";

export function Landing() {
  const navigate = useNavigate();
  return (
    <section>
      <p>Please select a game mode:</p>
      <button onClick={() => navigate("/single-player")}>Single Player</button>
      <button onClick={() => navigate("/double-player")}>Double Player</button>
    </section>
  );
}
