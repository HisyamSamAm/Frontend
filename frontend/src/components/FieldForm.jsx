import React, { useState, useEffect } from "react";

const defaultField = {
  nama_lapangan: "",
  jenis_olahraga: "",
  jenis_olahraga_detail: {
    nama: "",
    kode_jenis: "",
    deskripsi_singkat: "",
  },
  deskripsi_lapangan: "",
  harga_sewa_per_jam: 0,
  foto_lapangan_urls: [""],
  status_ketersediaan: "",
  fasilitas: [""],
  jam_operasional: {
    senin_jumat: "",
    sabtu_minggu: "",
  },
};

const FieldForm = ({ field, onSubmit, onCancel }) => {
  const [form, setForm] = useState(defaultField);

  useEffect(() => {
    if (field) {
      setForm({
        ...defaultField,
        ...field,
        jenis_olahraga_detail: {
          ...defaultField.jenis_olahraga_detail,
          ...(field.jenis_olahraga_detail || {}),
        },
        jam_operasional: {
          ...defaultField.jam_operasional,
          ...(field.jam_operasional || {}),
        },
        foto_lapangan_urls: field.foto_lapangan_urls?.length
          ? field.foto_lapangan_urls
          : [""],
        fasilitas: field.fasilitas?.length ? field.fasilitas : [""],
      });
    } else {
      setForm(defaultField);
    }
  }, [field]);

  // Handler untuk array input (foto & fasilitas)
  const handleArrayChange = (key, idx, value) => {
    setForm((prev) => {
      const arr = [...prev[key]];
      arr[idx] = value;
      return { ...prev, [key]: arr };
    });
  };

  const handleAddArrayItem = (key) => {
    setForm((prev) => ({
      ...prev,
      [key]: [...prev[key], ""],
    }));
  };

  const handleRemoveArrayItem = (key, idx) => {
    setForm((prev) => {
      const arr = [...prev[key]];
      arr.splice(idx, 1);
      return { ...prev, [key]: arr.length ? arr : [""] };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Bersihkan array kosong
    const cleanForm = {
      ...form,
      foto_lapangan_urls: form.foto_lapangan_urls.filter((f) => f.trim() !== ""),
      fasilitas: form.fasilitas.filter((f) => f.trim() !== ""),
    };
    onSubmit(cleanForm);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <div className="mb-2">
        <label>Nama Lapangan</label>
        <input
          type="text"
          className="border p-1 w-full"
          value={form.nama_lapangan}
          onChange={(e) =>
            setForm({ ...form, nama_lapangan: e.target.value })
          }
        />
      </div>
      <div className="mb-2">
        <label>Jenis Olahraga</label>
        <input
          type="text"
          className="border p-1 w-full"
          value={form.jenis_olahraga}
          onChange={(e) =>
            setForm({ ...form, jenis_olahraga: e.target.value })
          }
        />
      </div>
      <div className="mb-2">
        <label>Detail Jenis Olahraga</label>
        <input
          type="text"
          className="border p-1 w-full mb-1"
          placeholder="Nama"
          value={form.jenis_olahraga_detail.nama}
          onChange={(e) =>
            setForm({
              ...form,
              jenis_olahraga_detail: {
                ...form.jenis_olahraga_detail,
                nama: e.target.value,
              },
            })
          }
        />
        <input
          type="text"
          className="border p-1 w-full mb-1"
          placeholder="Kode Jenis"
          value={form.jenis_olahraga_detail.kode_jenis}
          onChange={(e) =>
            setForm({
              ...form,
              jenis_olahraga_detail: {
                ...form.jenis_olahraga_detail,
                kode_jenis: e.target.value,
              },
            })
          }
        />
        <input
          type="text"
          className="border p-1 w-full"
          placeholder="Deskripsi Singkat"
          value={form.jenis_olahraga_detail.deskripsi_singkat}
          onChange={(e) =>
            setForm({
              ...form,
              jenis_olahraga_detail: {
                ...form.jenis_olahraga_detail,
                deskripsi_singkat: e.target.value,
              },
            })
          }
        />
      </div>
      <div className="mb-2">
        <label>Deskripsi Lapangan</label>
        <textarea
          className="border p-1 w-full"
          value={form.deskripsi_lapangan}
          onChange={(e) =>
            setForm({ ...form, deskripsi_lapangan: e.target.value })
          }
        />
      </div>
      <div className="mb-2">
        <label>Harga Sewa per Jam</label>
        <input
          type="number"
          className="border p-1 w-full"
          value={form.harga_sewa_per_jam}
          onChange={(e) =>
            setForm({ ...form, harga_sewa_per_jam: Number(e.target.value) })
          }
        />
      </div>
      <div className="mb-2">
        <label>Foto Lapangan (URL)</label>
        {form.foto_lapangan_urls.map((url, idx) => (
          <div key={idx} className="flex mb-1">
            <input
              type="text"
              className="border p-1 w-full"
              value={url}
              onChange={(e) =>
                handleArrayChange("foto_lapangan_urls", idx, e.target.value)
              }
            />
            <button
              type="button"
              className="ml-2 px-2 bg-red-500 text-white rounded"
              onClick={() => handleRemoveArrayItem("foto_lapangan_urls", idx)}
              disabled={form.foto_lapangan_urls.length === 1}
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          className="px-2 bg-green-500 text-white rounded"
          onClick={() => handleAddArrayItem("foto_lapangan_urls")}
        >
          + Tambah Foto
        </button>
      </div>
      <div className="mb-2">
        <label>Status Ketersediaan</label>
        <input
          type="text"
          className="border p-1 w-full"
          value={form.status_ketersediaan}
          onChange={(e) =>
            setForm({ ...form, status_ketersediaan: e.target.value })
          }
        />
      </div>
      <div className="mb-2">
        <label>Fasilitas</label>
        {form.fasilitas.map((fasilitas, idx) => (
          <div key={idx} className="flex mb-1">
            <input
              type="text"
              className="border p-1 w-full"
              value={fasilitas}
              onChange={(e) =>
                handleArrayChange("fasilitas", idx, e.target.value)
              }
            />
            <button
              type="button"
              className="ml-2 px-2 bg-red-500 text-white rounded"
              onClick={() => handleRemoveArrayItem("fasilitas", idx)}
              disabled={form.fasilitas.length === 1}
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          className="px-2 bg-green-500 text-white rounded"
          onClick={() => handleAddArrayItem("fasilitas")}
        >
          + Tambah Fasilitas
        </button>
      </div>
      <div className="mb-2">
        <label>Jam Operasional</label>
        <input
          type="text"
          className="border p-1 w-full mb-1"
          placeholder="Senin - Jumat"
          value={form.jam_operasional.senin_jumat}
          onChange={(e) =>
            setForm({
              ...form,
              jam_operasional: {
                ...form.jam_operasional,
                senin_jumat: e.target.value,
              },
            })
          }
        />
        <input
          type="text"
          className="border p-1 w-full"
          placeholder="Sabtu - Minggu"
          value={form.jam_operasional.sabtu_minggu}
          onChange={(e) =>
            setForm({
              ...form,
              jam_operasional: {
                ...form.jam_operasional,
                sabtu_minggu: e.target.value,
              },
            })
          }
        />
      </div>
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Simpan
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-400 text-white rounded"
          onClick={onCancel}
        >
          Batal
        </button>
      </div>
    </form>
  );
};

export default FieldForm;