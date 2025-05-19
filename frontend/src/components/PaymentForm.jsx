import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentForm = ({ payment, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    pemesanan_id: payment ? payment.pemesanan_id : '',
    nama_pelanggan: payment ? payment.nama_pelanggan : '',
    lapangan_id: payment ? payment.lapangan_id : '',
    tanggal_main: payment ? payment.tanggal_main : '',
    jumlah_bayar: payment ? payment.jumlah_bayar : '',
    metode_pembayaran: payment ? payment.metode_pembayaran : '',
    tanggal_pembayaran: payment ? payment.tanggal_pembayaran : '',
    bukti_pembayaran_url: payment ? payment.bukti_pembayaran_url : '',
    status_pembayaran: payment ? payment.status_pembayaran : 'Belum Lunas',
    admin_verifikator: payment ? payment.admin_verifikator : '',
    catatan: payment ? payment.catatan : '',
  });

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3333/api/pemesanan');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
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
        <label className="mb-2 font-semibold">Pemesanan</label>
        <select
          name="pemesanan_id"
          value={formData.pemesanan_id}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        >
          {bookings.map((booking) => (
            <option key={booking._id} value={booking._id}>
              {booking.nama_pelanggan} - {booking.lapangan_id} - {booking.tanggal_main}
            </option>
          ))}
        </select>
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
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Lapangan</label>
        <input
          type="text"
          name="lapangan_id"
          value={formData.lapangan_id}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
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
        <label className="mb-2 font-semibold">Jumlah Bayar</label>
        <input
          type="number"
          name="jumlah_bayar"
          value={formData.jumlah_bayar}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Metode Pembayaran</label>
        <input
          type="text"
          name="metode_pembayaran"
          value={formData.metode_pembayaran}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Tanggal Pembayaran</label>
        <input
          type="datetime-local"
          name="tanggal_pembayaran"
          value={formData.tanggal_pembayaran}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Bukti Pembayaran (URL)</label>
        <input
          type="text"
          name="bukti_pembayaran_url"
          value={formData.bukti_pembayaran_url}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
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
          <option value="DP Sebagian">DP Sebagian</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Admin Verifikator</label>
        <input
          type="text"
          name="admin_verifikator"
          value={formData.admin_verifikator}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Catatan</label>
        <textarea
          name="catatan"
          value={formData.catatan}
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

export default PaymentForm;