import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingForm = ({ booking, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nama_pelanggan: booking ? booking.nama_pelanggan : '',
    kontak_pelanggan: booking ? booking.kontak_pelanggan : '',
    lapangan_id: booking ? booking.lapangan_id : '',
    tanggal_main: booking ? booking.tanggal_main : '',
    jam_mulai: booking ? booking.jam_mulai : '',
    jam_selesai: booking ? booking.jam_selesai : '',
    durasi_jam: booking ? booking.durasi_jam : '',
    total_biaya: booking ? booking.total_biaya : '',
    status_pemesanan: booking ? booking.status_pemesanan : 'Menunggu Pembayaran',
    status_pembayaran: booking ? booking.status_pembayaran : 'Belum Lunas',
    catatan_admin: booking ? booking.catatan_admin : '',
    admin_pencatat: booking ? booking.admin_pencatat : '',
  });

  const [fields, setFields] = useState([]);

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3333/api/lapangan');
      setFields(response.data);
    } catch (error) {
      console.error('Error fetching fields:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Nama Pelanggan</label>
        <input
          type="text"
          name="nama_pelanggan"
          value={formData.nama_pelanggan}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Kontak Pelanggan</label>
        <input
          type="text"
          name="kontak_pelanggan"
          value={formData.kontak_pelanggan}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Lapangan</label>
        <select
          name="lapangan_id"
          value={formData.lapangan_id}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        >
          {fields.map((field) => (
            <option key={field._id} value={field._id}>
              {field.nama_lapangan}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Tanggal Main</label>
        <input
          type="date"
          name="tanggal_main"
          value={formData.tanggal_main}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Jam Mulai</label>
        <input
          type="time"
          name="jam_mulai"
          value={formData.jam_mulai}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Jam Selesai</label>
        <input
          type="time"
          name="jam_selesai"
          value={formData.jam_selesai}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Durasi (jam)</label>
        <input
          type="number"
          name="durasi_jam"
          value={formData.durasi_jam}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Total Biaya</label>
        <input
          type="number"
          name="total_biaya"
          value={formData.total_biaya}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Status Pemesanan</label>
        <select
          name="status_pemesanan"
          value={formData.status_pemesanan}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
          <option value="Dikonfirmasi">Dikonfirmasi</option>
          <option value="Selesai">Selesai</option>
          <option value="Dibatalkan">Dibatalkan</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Status Pembayaran</label>
        <select
          name="status_pembayaran"
          value={formData.status_pembayaran}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="Belum Lunas">Belum Lunas</option>
          <option value="Lunas">Lunas</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Catatan Admin</label>
        <textarea
          name="catatan_admin"
          value={formData.catatan_admin}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Admin Pencatat</label>
        <input
          type="text"
          name="admin_pencatat"
          value={formData.admin_pencatat}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex space-x-4">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
      </div>
    </form>
  );
};

export default BookingForm;