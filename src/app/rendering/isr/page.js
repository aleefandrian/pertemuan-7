export default async function HalamanISR() {
  const respon = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4', {
    next: { revalidate: 15 }, // 🌟 Segarkan halaman di belakang layar maksimal tiap 15 detik!
  });
  const pengumuman = await respon.json();
  const waktuRakit = new Date().toLocaleTimeString('id-ID');

  return (
    <div style={{ padding: '24px' }}>
      <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold' }}>
        MODE: ISR (Revalidate Setiap 15 Detik)
      </span>
      <h1>📢 Papan Pengumuman Kampus (Update Berkala)</h1>
      <p>
        <strong>Jam Terakhir Etalase Diperbarui:</strong> {waktuRakit} <br />
        <em>(Jika kamu refresh dalam waktu kurang dari 15 detik, jam tetap sama. Setelah lewat 15 detik, jam akan diperbarui!)</em>
      </p>

      {pengumuman.map((item) => (
        <div key={item.id} style={{ border: '1px solid #cbd5e1', padding: '12px', marginBottom: '10px', borderRadius: '6px' }}>
          <h3 style={{ margin: '0 0 6px 0' }}>{item.title}</h3>
          <p style={{ margin: 0, color: '#475569' }}>{item.body}</p>
        </div>
      ))}
    </div>
  );
}