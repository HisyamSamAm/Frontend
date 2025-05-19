import React, { useEffect, useState } from "react";
import axios from "axios";

const ManajemenJadwal = () => {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ambil daftar lapangan
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:3333/api/lapangan");
        if (Array.isArray(res.data)) {
          setFields(res.data);
        } else if (Array.isArray(res.data.data)) {
          setFields(res.data.data);
        } else {
          setFields([]);
        }
      } catch {
        setFields([]);
      }
    };
    fetchFields();
  }, []);

  // Ambil jadwal setiap kali lapangan/tanggal berubah
  useEffect(() => {
    if (selectedField && selectedDate) {
      fetchSchedules();
    } else {
      setSchedules([]);
    }
    // eslint-disable-next-line
  }, [selectedField, selectedDate]);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://127.0.0.1:3333/api/jadwal?lapangan_id=${selectedField}&tanggal=${selectedDate}`
      );
      if (Array.isArray(res.data)) {
        setSchedules(res.data);
      } else if (Array.isArray(res.data.data)) {
        setSchedules(res.data.data);
      } else {
        setSchedules([]);
      }
    } catch {
      setSchedules([]);
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manajemen Jadwal</h1>
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block mb-1">Lapangan</label>
          <select
            className="border p-1"
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
          >
            <option value="">Pilih Lapangan</option>
            {fields.map((f) => (
              <option key={f._id} value={f._id}>
                {f.nama_lapangan || f._id}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Tanggal</label>
          <input
            type="date"
            className="border p-1"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {!selectedField || !selectedDate ? (
        <div className="text-gray-500 text-center py-8">
          Silakan pilih lapangan dan tanggal untuk melihat jadwal.
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Jam Mulai</th>
              <th className="py-2 px-4 border-b">Jam Selesai</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Nama Pelanggan</th>
              <th className="py-2 px-4 border-b">Pemesanan ID</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : schedules.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Tidak ada jadwal.
                </td>
              </tr>
            ) : (
              schedules.map((jadwal) => (
                <tr key={jadwal._id?.$oid || jadwal._id}>
                  <td className="py-2 px-4 border-b">{jadwal.jam_mulai}</td>
                  <td className="py-2 px-4 border-b">{jadwal.jam_selesai}</td>
                  <td className="py-2 px-4 border-b">{jadwal.status_slot}</td>
                  <td className="py-2 px-4 border-b">{jadwal.nama_pelanggan}</td>
                  <td className="py-2 px-4 border-b">{jadwal.pemesanan_id}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManajemenJadwal;