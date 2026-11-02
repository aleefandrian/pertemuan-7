export default async function HalamanSSG() {

  // Mengambil data dengan opsi 'force-cache' (Disimpan permanen saat build)
  const respon = await fetch('https://jsonplaceholder.typicode.com/users', {
    cache: 'force-cache',
  });
  
  const daftarDosen = await respon.json();

  // Mencatat jam saat halaman ini dirakit oleh server
  const waktuRakit = new Date().toLocaleTimeString('id-ID');

  return (
    <div style={{ padding: '24px' }}>
      <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold' }}>
        MODE: SSG (Static Site Generation)
      </span>
      <h1>👨‍🏫 Direktori Dosen Tetap (Data Statis)</h1>
      <p>
        <strong>Jam Halaman Dirakit:</strong> {waktuRakit} <br />
        <em>(Saat sudah di-build, jam di atas TIDAK AKAN BERUBAH meskipun kamu me-refresh browser berkali-kali!)</em>
      </p>

      <ul>
        {daftarDosen.slice(0, 5).map((dosen) => (
          <li key={dosen.id} style={{ marginBottom: '8px' }}>
            <strong>{dosen.name}</strong> — Email: {dosen.email}
          </li>
        ))}
      </ul>
    </div>
  );
}