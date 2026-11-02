"use client"

export default function CekEnvClient() {
  return (
    <div style={{ background: '#fef3c7', padding: '16px', borderRadius: '8px', marginTop: '16px' }}>
      <h3 style={{ marginTop: 0 }}>🕵️ Percobaan dari Client Component (Browser):</h3>
      <p>Nama Kampus (Publik): <strong>{process.env.NEXT_PUBLIC_NAMA_KAMPUS}</strong></p>
      <p>
        Kode Brankas Rahasia:{' '}
        <strong>{process.env.KODE_BRANKAS_RAHASIA || '🔒 DISEMBUNYIKAN OLEH NEXT.JS (Kosong/Undefined)!'}</strong>
      </p>
    </div>
  );
}