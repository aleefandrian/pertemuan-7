import EtalaseBukuInteraktif from '@/components/EtalaseBukuInteraktif';

export default async function HalamanPerpustakaan() {
  // Mengambil data dari API di sisi Server
  const respon = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=100');
  const dataMentah = await respon.json();

  // Merapikan data di server sebelum dikirim ke Client Component
  const koleksiBuku = dataMentah.map((item, idx) => ({
    id: item.id,
    judul: `Buku Panduan Web Modern Vol. ${idx + 1}: ${item.title.slice(0, 28)}`,
    kategori: idx % 2 === 0 ? 'Rekayasa Perangkat Lunak' : 'Arsitektur Cloud & API',
    rak: `Rak A-${idx + 1}`,
  }));

  return (
    <main style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '4px' }}>🏛️ Perpustakaan Digital Politeknik Takumi</h1>
      <p style={{ color: '#475569', marginBottom: '20px' }}>
        Data buku di bawah ini diambil oleh <strong>Server Component</strong>, sedangkan fitur pencarian dan tombol pinjam dijalankan oleh <strong>Client Component</strong>!
      </p>

      {/* Mengoper data dari Server Component ke Client Component melalui Props */}
      <EtalaseBukuInteraktif daftarBukuAwal={koleksiBuku} />
    </main>
  );
}