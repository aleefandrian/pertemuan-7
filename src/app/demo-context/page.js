'use client';

import { TemaProvider, useTema } from '@/context/TemaContext';

function TombolSaklarTema() {
  // Mengambil state dan fungsi langsung dari Context (Tanpa Props!)
  const { temaGelap, ubahTema } = useTema();

  return (
    <button
      onClick={ubahTema}
      style={{
        padding: '10px 18px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        backgroundColor: temaGelap ? '#facc15' : '#1e3a8a',
        color: temaGelap ? '#0f172a' : '#ffffff',
        border: 'none'
      }}
    >
      {temaGelap ? '☀️ Ganti ke Mode Terang' : '🌙 Ganti ke Mode Gelap'}
    </button>
  );
}

export default function HalamanDemoContext() {
  return (
    <TemaProvider>
      <div style={{ padding: '32px' }}>
        <h1>🎨 Eksperimen React Context API (Dark / Light Mode)</h1>
        <p>Klik tombol di bawah ini untuk mengubah tema seluruh layar tanpa mengoper props:</p>
        <TombolSaklarTema />
      </div>
    </TemaProvider>
  );
}