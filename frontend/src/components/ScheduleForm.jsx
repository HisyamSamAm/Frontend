import React, { useState } from 'react';

const ScheduleForm = ({ schedule, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    lapangan_id: schedule ? schedule.lapangan_id : '',
    tanggal: schedule ? schedule.tanggal : '',
    jam_mulai: schedule ? schedule.jam_mulai : '',
    jam_selesai: schedule ? schedule.jam_selesai : '',
    status_slot: schedule ? schedule.status_slot : 'Tersedia',
    pemesanan_id: schedule ? schedule.pemesanan_id : '',
    nama_pelanggan: schedule ? schedule.nama_pelanggan : '',
  });

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
        <label className="mb-2 font-semibold">Lapangan ID</label>
        <input
          type="text"
          name="lapangan_id"
          value={formData.lapangan_id}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Tanggal</label>
        <input
          type="date"
          name="tanggal"
          value={formData.tanggal}
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
        <label className="mb-2 font-semibold">Status Slot</label>
        <select
          name="status_slot"
          value={formData.status_slot}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="Tersedia">Tersedia</option>
          <option value="Dipesan">Dipesan</option>
          <option value="Diblokir Admin">Diblokir Admin</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Pemesanan ID</label>
        <input
          type="text"
          name="pemesanan_id"
          value={formData.pemesanan_id}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
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
      <div className="flex space-x-4">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
      </div>
    </form>
  );
};

export default ScheduleForm;