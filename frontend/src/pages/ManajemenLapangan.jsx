import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FieldForm from '../components/FieldForm';

const ManajemenLapangan = () => {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:3333/api/lapangan');
    // Cek jika response.data.data adalah array, jika tidak cek response.data
    if (Array.isArray(response.data)) {
      setFields(response.data);
    } else if (Array.isArray(response.data.data)) {
      setFields(response.data.data);
    } else {
      setFields([]);
    }
  } catch (error) {
    console.error('Error fetching fields:', error);
    setFields([]);
  }
};

  const handleAddField = () => {
    setSelectedField(null);
    setIsFormVisible(true);
  };

  const handleEditField = (field) => {
    setSelectedField(field);
    setIsFormVisible(true);
  };

  const handleDeleteField = async (fieldId) => {
    try {
      await axios.delete(`http://127.0.0.1:3333/api/lapangan/${fieldId}`);
      fetchFields();
    } catch (error) {
      console.error('Error deleting field:', error);
    }
  };

  const handleFormSubmit = async (fieldData) => {
    try {
      if (selectedField) {
        await axios.put(`http://127.0.0.1:3333/api/lapangan/${selectedField._id}`, fieldData);
      } else {
        await axios.post('http://127.0.0.1:3333/api/lapangan', fieldData);
      }
      fetchFields();
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manajemen Lapangan</h1>
      <button
        onClick={handleAddField}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        Tambah Lapangan
      </button>
      {isFormVisible && (
        <FieldForm
          field={selectedField}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormVisible(false)}
        />
      )}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nama Lapangan</th>
            <th className="py-2 px-4 border-b">Jenis Olahraga</th>
            <th className="py-2 px-4 border-b">Deskripsi</th>
            <th className="py-2 px-4 border-b">Harga Sewa per Jam</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field._id}>
              <td className="py-2 px-4 border-b">{field.nama_lapangan}</td>
              <td className="py-2 px-4 border-b">{field.jenis_olahraga}</td>
              <td className="py-2 px-4 border-b">{field.deskripsi_lapangan}</td>
              <td className="py-2 px-4 border-b">{field.harga_sewa_per_jam}</td>
              <td className="py-2 px-4 border-b">{field.status_ketersediaan}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEditField(field)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteField(field._id)}
                  className="px-2 py-1 bg-gray-500 text-white rounded"
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

export default ManajemenLapangan;