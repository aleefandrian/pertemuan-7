import CekEnvClient from '@/components/CekEnvClient';

export default function HalamanKeamanan() {
  // Server Component BISA membaca KODE_BRANKAS_RAHASIA untuk keperluan internal server
  const apakahKunciAdaDiServer = process.env.NEXT_PUBLIC_KODE_BRANKAS_RAHASIA ? '✅ Terbaca dengan Aman di Server' : '❌ Tidak Ada';

  return (
    <div style={{ padding: '24px' }}>
      <h1>🔐 Eksperimen Keamanan Environment Variable</h1>
      <div style={{ background: '#dcfce7', padding: '16px', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>🏢 Status di Server Component:</h3>
        <p>Status Kunci Brankas: <strong>{apakahKunciAdaDiServer}</strong></p>
      </div>

      {/* Memanggil Client Component di bawahnya */}
      <CekEnvClient />
    </div>
  );
}