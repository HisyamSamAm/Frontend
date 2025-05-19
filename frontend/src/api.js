import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:3333/api';

// Fields API
export const getFields = async () => {
  const response = await axios.get(`${API_BASE_URL}/lapangan`);
  return response.data;
};

export const getFieldById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/lapangan/${id}`);
  return response.data;
};

export const createField = async (fieldData) => {
  const response = await axios.post(`${API_BASE_URL}/lapangan`, fieldData);
  return response.data;
};

export const updateField = async (id, fieldData) => {
  const response = await axios.put(`${API_BASE_URL}/lapangan/${id}`, fieldData);
  return response.data;
};

export const deleteField = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/lapangan/${id}`);
  return response.data;
};

// Schedules API
export const getSchedules = async (lapanganId, tanggal) => {
  const response = await axios.get(`${API_BASE_URL}/jadwal`, {
    params: { lapangan_id: lapanganId, tanggal },
  });
  return response.data;
};

export const createSchedule = async (scheduleData) => {
  const response = await axios.post(`${API_BASE_URL}/jadwal`, scheduleData);
  return response.data;
};

export const updateSchedule = async (id, scheduleData) => {
  const response = await axios.put(`${API_BASE_URL}/jadwal/${id}`, scheduleData);
  return response.data;
};

export const deleteSchedule = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/jadwal/${id}`);
  return response.data;
};

// Bookings API
export const getBookings = async () => {
  const response = await axios.get(`${API_BASE_URL}/pemesanan`);
  return response.data;
};

export const getBookingById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/pemesanan/${id}`);
  return response.data;
};

export const createBooking = async (bookingData) => {
  const response = await axios.post(`${API_BASE_URL}/pemesanan`, bookingData);
  return response.data;
};

export const updateBooking = async (id, bookingData) => {
  const response = await axios.put(`${API_BASE_URL}/pemesanan/${id}`, bookingData);
  return response.data;
};

export const deleteBooking = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/pemesanan/${id}`);
  return response.data;
};

// Payments API
export const getPayments = async () => {
  const response = await axios.get(`${API_BASE_URL}/pembayaran`);
  return response.data;
};

export const getPaymentById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/pembayaran/${id}`);
  return response.data;
};

export const createPayment = async (paymentData) => {
  const response = await axios.post(`${API_BASE_URL}/pembayaran`, paymentData);
  return response.data;
};

export const updatePayment = async (id, paymentData) => {
  const response = await axios.put(`${API_BASE_URL}/pembayaran/${id}`, paymentData);
  return response.data;
};

export const deletePayment = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/pembayaran/${id}`);
  return response.data;
};