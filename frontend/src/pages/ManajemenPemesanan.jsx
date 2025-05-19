import React, { useEffect, useState } from "react";
import axios from "axios";

const initialForm = {
  nama_pelanggan: "",
  kontak_pelanggan: "",
  lapangan_id: "",
  tanggal_main: "",
  jam_mulai: "",
  jam_selesai: "",
  // Tambahkan field lain jika ingin
};

const ManajemenPemesanan = () => {
  const [pemesananList, setPemesananList] = useState([]);
  const [lapanganList, setLapanganList] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchPemesanan();
    fetchLapangan();
  }, []);

  const fetchPemesanan = async () => {
    const res = await axios.get("http://127.0.0.1:3333/api/pemesanan");
    setPemesananList(res.data.data || res.data);
  };

  const fetchLapangan = async () => {
    const res = await axios.get("http://127.0.0.1:3333/api/lapangan");
    setLapanganList(res.data.data || res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(
        `http://127.0.0.1:3333/api/pemesanan/${editing._id}`,
        form
      );
    } else {
      await axios.post("http://127.0.0.1:3333/api/pemesanan", form);
    }
    setForm(initialForm);
    setEditing(null);
    fetchPemesanan();
  };

  const handleEdit = (p) => {
    setEditing(p);
    setForm({
      nama_pelanggan: p.nama_pelanggan,
      kontak_pelanggan: p.kontak_pelanggan,
      lapangan_id: p.lapangan_id,
      tanggal_main: p.tanggal_main,
      jam_mulai: p.jam_mulai,
      jam_selesai: p.jam_selesai,
      // Tambahkan field lain jika ingin
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus pemesanan ini?")) {
      await axios.delete(`http://127.0.0.1:3333/api/pemesanan/${id}`);
      fetchPemesanan();
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setForm(initialForm);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manajemen Pemesanan</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2 max-w-md">
        <input
          type="text"
          name="nama_pelanggan"
          placeholder="Nama Pelanggan"
          value={form.nama_pelanggan}
          onChange={handleChange}
          required
          className="border px-2 py-1"
        />
        <input
          type="number"
          name="kontak_pelanggan"
          placeholder="Kontak Pelanggan"
          value={form.kontak_pelanggan}
          onChange={handleChange}
          required
          className="border px-2 py-1"
        />
        <select
          name="lapangan_id"
          value={form.lapangan_id}
          onChange={handleChange}
          required
          className="border px-2 py-1"
        >
          <option value="">Pilih Lapangan</option>
          {lapanganList.map((l) => (
            <option key={l._id} value={l._id}>
              {l.nama_lapangan}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="tanggal_main"
          value={form.tanggal_main}
          onChange={handleChange}
          required
          className="border px-2 py-1"
        />
        <input
          type="time"
          name="jam_mulai"
          value={form.jam_mulai}
          onChange={handleChange}
          required
          className="border px-2 py-1"
        />
        <input
          type="time"
          name="jam_selesai"
          value={form.jam_selesai}
          onChange={handleChange}
          required
          className="border px-2 py-1"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            {editing ? "Update" : "Tambah"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 text-white px-4 py-1 rounded"
            >
              Batal
            </button>
          )}
        </div>
      </form>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nama Pelanggan</th>
            <th className="py-2 px-4 border-b">Kontak</th>
            <th className="py-2 px-4 border-b">Lapangan</th>
            <th className="py-2 px-4 border-b">Tanggal</th>
            <th className="py-2 px-4 border-b">Jam Mulai</th>
            <th className="py-2 px-4 border-b">Jam Selesai</th>
            <th className="py-2 px-4 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pemesananList.map((p) => (
            <tr key={p._id}>
              <td className="py-2 px-4 border-b">{p.nama_pelanggan}</td>
              <td className="py-2 px-4 border-b">{p.kontak_pelanggan}</td>
              <td className="py-2 px-4 border-b">
                {lapanganList.find((l) => l._id === p.lapangan_id)?.nama_lapangan || "-"}
              </td>
              <td className="py-2 px-4 border-b">{p.tanggal_main}</td>
              <td className="py-2 px-4 border-b">{p.jam_mulai}</td>
              <td className="py-2 px-4 border-b">{p.jam_selesai}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(p._id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManajemenPemesanan;