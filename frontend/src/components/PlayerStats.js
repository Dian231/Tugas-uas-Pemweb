import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function PlayerStats() {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Messi', goals: 30, assists: 12, appearances: 35 },
    { id: 2, name: 'Ronaldo', goals: 28, assists: 10, appearances: 33 },
  ]);

  const [form, setForm] = useState({ name: '', goals: '', assists: '', appearances: '' });
  const [editId, setEditId] = useState(null);

  // Handle input form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update player
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) return alert('Nama pemain wajib diisi!');

    if (editId) {
      // Update existing
      setPlayers(players.map(p => p.id === editId ? { ...form, id: editId, goals: +form.goals, assists: +form.assists, appearances: +form.appearances } : p));
      setEditId(null);
    } else {
      // Add new
      const newPlayer = {
        ...form,
        id: players.length ? Math.max(...players.map(p => p.id)) + 1 : 1,
        goals: +form.goals,
        assists: +form.assists,
        appearances: +form.appearances,
      };
      setPlayers([...players, newPlayer]);
    }

    setForm({ name: '', goals: '', assists: '', appearances: '' });
  };

  // Edit player
  const handleEdit = (player) => {
    setEditId(player.id);
    setForm({
      name: player.name,
      goals: player.goals,
      assists: player.assists,
      appearances: player.appearances,
    });
  };

  // Delete player
  const handleDelete = (id) => {
    if (window.confirm('Yakin mau hapus pemain ini?')) {
      setPlayers(players.filter(p => p.id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-5 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-5 text-center">CRUD Statistik Pemain Sepak Bola</h2>

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 sm:grid-cols-5 gap-3 items-end">
        <div>
          <label className="block mb-1 font-medium">Nama</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Goals</label>
          <input
            type="number"
            name="goals"
            value={form.goals}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1"
            min="0"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Assists</label>
          <input
            type="number"
            name="assists"
            value={form.assists}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1"
            min="0"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Appearances</label>
          <input
            type="number"
            name="appearances"
            value={form.appearances}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1"
            min="0"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            {editId ? 'Update' : 'Tambah'}
          </button>
        </div>
      </form>

      {/* List pemain */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-3 py-1">Nama</th>
              <th className="border border-gray-300 px-3 py-1">Goals</th>
              <th className="border border-gray-300 px-3 py-1">Assists</th>
              <th className="border border-gray-300 px-3 py-1">Appearances</th>
              <th className="border border-gray-300 px-3 py-1">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {players.map(player => (
              <tr key={player.id}>
                <td className="border border-gray-300 px-3 py-1">{player.name}</td>
                <td className="border border-gray-300 px-3 py-1">{player.goals}</td>
                <td className="border border-gray-300 px-3 py-1">{player.assists}</td>
                <td className="border border-gray-300 px-3 py-1">{player.appearances}</td>
                <td className="border border-gray-300 px-3 py-1 space-x-2">
                  <button
                    onClick={() => handleEdit(player)}
                    className="text-yellow-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(player.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart Statistik */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-3">Chart Statistik</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={players}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="goals" fill="#8884d8" name="Goals" />
            <Bar dataKey="assists" fill="#82ca9d" name="Assists" />
            <Bar dataKey="appearances" fill="#ffc658" name="Appearances" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
