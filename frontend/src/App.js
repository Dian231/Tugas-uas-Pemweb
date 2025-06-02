// src/App.js
import React, { useEffect, useState } from "react";
import PlayerList from "./components/PlayerStats";
import PlayerForm from "./components/PlayerForm";

function App() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState("");

  const fetchPlayers = async () => {
    try {
      const response = await fetch("http://localhost:6543/api/players");
      if (!response.ok) throw new Error("Gagal fetch pemain");
      const data = await response.json();
      setPlayers(data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleAddPlayer = async (player) => {
    try {
      const response = await fetch("http://localhost:6543/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(player),
      });
      if (!response.ok) throw new Error("Gagal tambah pemain");
      await fetchPlayers();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleDeletePlayer = async (id) => {
    try {
      const response = await fetch(`http://localhost:6543/api/players/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Gagal hapus pemain");
      await fetchPlayers();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h1>Statistik Pemain Bola</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <PlayerForm onAdd={handleAddPlayer} />
      <PlayerList players={players} onDelete={handleDeletePlayer} />
    </div>
  );
}

export default App;
