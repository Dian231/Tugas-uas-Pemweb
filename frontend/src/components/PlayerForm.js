// src/components/PlayerForm.js
import React, { useState } from "react";

function PlayerForm({ onAdd }) {
  const [form, setForm] = useState({ name: "", goals: "", assists: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.goals || !form.assists) return;
    onAdd({
      name: form.name,
      goals: Number(form.goals),
      assists: Number(form.assists),
    });
    setForm({ name: "", goals: "", assists: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nama"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Gol"
        value={form.goals}
        onChange={(e) => setForm({ ...form, goals: e.target.value })}
      />
      <input
        type="number"
        placeholder="Assist"
        value={form.assists}
        onChange={(e) => setForm({ ...form, assists: e.target.value })}
      />
      <button type="submit">Tambah</button>
    </form>
  );
}

export default PlayerForm;
