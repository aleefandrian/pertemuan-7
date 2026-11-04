'use client'; // Wajib karena Context memakai useState di sisi browser

import { createContext, useContext, useState } from 'react';

// 1. Buat Saluran Context
const TemaContext = createContext();

// 2. Buat Komponen Pemancar (Provider)
export function TemaProvider({ children }) {
  const [temaGelap, setTemaGelap] = useState(false);

  function ubahTema() {
    setTemaGelap((sebelumnya) => !sebelumnya);
  }

  return (
    <TemaContext.Provider value={{ temaGelap, ubahTema }}>
      <div style={{
        backgroundColor: temaGelap ? '#0f172a' : '#f8fafc',
        color: temaGelap ? '#f8fafc' : '#0f172a',
        minHeight: '100vh',
        transition: 'all 0.3s ease'
      }}>
        {children}
      </div>
    </TemaContext.Provider>
  );
}

// 3. Buat Custom Hook agar komponen anak gampang mengambil data
export function useTema() {
  return useContext(TemaContext);
}