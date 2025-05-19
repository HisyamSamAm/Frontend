import React, { useEffect, useState } from "react";
import axios from "axios";

const initialForm = {
  pemesanan_id: "",
  nama_pelanggan: "",
  lapangan_id: "",
  tanggal_main: "",
  jumlah_bayar: "",
  metode_pembayaran: "",
  tanggal_pembayaran: "",
  bukti_pembayaran_url: "",
  status_pembayaran: "",
  admin_verifikator: "",
  catatan: "",
};

const ManajemenPembayaran = () => {
  const [pembayaranList, setPembayaranList] = useState([]);
  const [lapanganList, setLapanganList] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchPembayaran();
    fetchLapangan();
  }, []);

  const fetchPembayaran = async () => {
    const res = await axios.get("http://127.0.0.1:3333/api/pembayaran");
    setPembayaranList(res.data.data || res.data);
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
        `http://127.0.0.1:3333/api/pembayaran/${editing._id}`,
        form
      );
    } else {
      await axios.post("http://127.0.0.1:3333/api/pembayaran", form);
    }
    setForm(initialForm);
    setEditing(null);
    fetchPembayaran();
  };

  const handleEdit = (p) => {
    setEditing(p);
    setForm({
      pemesanan_id: p.pemesanan_id,
      nama_pelanggan: p.nama_pelanggan,
      lapangan_id: p.lapangan_id,
      tanggal_main: p.tanggal_main,
      jumlah_bayar: p.jumlah_bayar,
      metode_pembayaran: p.metode_pembayaran,
      tanggal_pembayaran: p.tanggal_pembayaran?.slice(0, 16) || "",
      bukti_pembayaran_url: p.bukti_pembayaran_url,
      status_pembayaran: p.status_pembayaran,
      admin_verifikator: p.admin_verifikator,
      catatan: p.catatan,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus pembayaran ini?")) {
      await axios.delete(`http://127.0.0.1:3333/api/pembayaran/${id}`);
      fetchPembayaran();
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setForm(initialForm);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manajemen Pembayaran</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2 max-w-md">
        <input
          type="text"
          name="pemesanan_id"
          placeholder="ID Pemesanan"
          value={form.pemesanan_id}
          onChange={handleChange}
          required
          className="border px-2 py-1"
        />
        <input
          type="text"
          name="nama_pelanggan"
          placeholder="Nama Pelanggan"
          value={form.nama_pelanggan}
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
          type="number"
          name="jumlah_bayar"
          placeholder="Jumlah Bayar"
          value={form.jumlah_bayar}
          onChange={handleChange}
          required
          className="border px-2 py-1"
        />
        <input
          type="text"
          name="metode_pembayaran"
          placeholder="Metode Pembayaran"
          value={form.metode_pembayaran}
          onChange={handleChange}
          required
          className="border px-2 py-1"
        />
        <input
          type="datetime-local"
          name="tanggal_pembayaran"
          value={form.tanggal_pembayaran}
          onChange={handleChange}
          required
          className="border px-2 py-1"
        />
        <input
          type="text"
          name="bukti_pembayaran_url"
          placeholder="URL Bukti Pembayaran"
          value={form.bukti_pembayaran_url}
          onChange={handleChange}
          className="border px-2 py-1"
        />
        <input
          type="text"
          name="status_pembayaran"
          placeholder="Status Pembayaran"
          value={form.status_pembayaran}
          onChange={handleChange}
          required
          className="border px-2 py-1"
        />
        <input
          type="text"
          name="admin_verifikator"
          placeholder="Admin Verifikator"
          value={form.admin_verifikator}
          onChange={handleChange}
          className="border px-2 py-1"
        />
        <input
          type="text"
          name="catatan"
          placeholder="Catatan"
          value={form.catatan}
          onChange={handleChange}
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
            <th className="py-2 px-4 border-b">ID Pemesanan</th>
            <th className="py-2 px-4 border-b">Nama Pelanggan</th>
            <th className="py-2 px-4 border-b">Lapangan</th>
            <th className="py-2 px-4 border-b">Tanggal Main</th>
            <th className="py-2 px-4 border-b">Jumlah Bayar</th>
            <th className="py-2 px-4 border-b">Metode</th>
            <th className="py-2 px-4 border-b">Tanggal Bayar</th>
            <th className="py-2 px-4 border-b">Bukti</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Admin</th>
            <th className="py-2 px-4 border-b">Catatan</th>
            <th className="py-2 px-4 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pembayaranList.map((p) => (
            <tr key={p._id}>
              <td className="py-2 px-4 border-b">{p.pemesanan_id}</td>
              <td className="py-2 px-4 border-b">{p.nama_pelanggan}</td>
              <td className="py-2 px-4 border-b">
                {lapanganList.find((l) => l._id === p.lapangan_id)?.nama_lapangan || "-"}
              </td>
              <td className="py-2 px-4 border-b">{p.tanggal_main}</td>
              <td className="py-2 px-4 border-b">{p.jumlah_bayar}</td>
              <td className="py-2 px-4 border-b">{p.metode_pembayaran}</td>
              <td className="py-2 px-4 border-b">
                {p.tanggal_pembayaran
                  ? new Date(p.tanggal_pembayaran).toLocaleString()
                  : ""}
              </td>
              <td className="py-2 px-4 border-b">
                {p.bukti_pembayaran_url ? (
                  <a
                    href={p.bukti_pembayaran_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Lihat
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="py-2 px-4 border-b">{p.status_pembayaran}</td>
              <td className="py-2 px-4 border-b">{p.admin_verifikator}</td>
              <td className="py-2 px-4 border-b">{p.catatan}</td>
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

export default ManajemenPembayaran;