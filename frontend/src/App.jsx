import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import ManajemenLapangan from './pages/ManajemenLapangan';
import ManajemenJadwal from './pages/ManajemenJadwal';
import ManajemenPemesanan from './pages/ManajemenPemesanan';
import ManajemenPembayaran from './pages/ManajemenPembayaran';

const navItems = [
  { to: "/manajemen-lapangan", label: "Manajemen Lapangan" },
  { to: "/manajemen-jadwal", label: "Manajemen Jadwal" },
  { to: "/manajemen-pemesanan", label: "Manajemen Pemesanan" },
  { to: "/manajemen-pembayaran", label: "Manajemen Pembayaran" },
];

const Navbar = () => (
  <nav className="mb-4 sm:mb-6 bg-gray-100 p-2 sm:p-4 rounded flex flex-wrap gap-2 sm:gap-4">
    {navItems.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          `px-2 py-1 sm:px-3 sm:py-2 rounded font-medium text-xs sm:text-base ${
            isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"
          }`
        }
      >
        {item.label}
      </NavLink>
    ))}
  </nav>
);

function App() {
  return (
    <Router>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/manajemen-lapangan" replace />} />
          <Route path="/manajemen-lapangan" element={<ManajemenLapangan />} />
          <Route path="/manajemen-jadwal" element={<ManajemenJadwal />} />
          <Route path="/manajemen-pemesanan" element={<ManajemenPemesanan />} />
          <Route path="/manajemen-pembayaran" element={<ManajemenPembayaran />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;