export default async function HalamanSSR() {
  // 🌟 cache: 'no-store' memaksa server memasak ulang halaman setiap kali di-refresh!
  const respon = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', {
    cache: 'no-store',
  });
  const antreanKrs = await respon.json();
  const waktuRakit = new Date().toLocaleTimeString('id-ID');

  return (
    <div style={{ padding: '24px' }}>
      <span style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold' }}>
        MODE: SSR (Server-Side Rendering Real-Time)
      </span>
      <h1>⚡ Pantauan Antrean Server KRS (Real-Time)</h1>
      <p>
        <strong>Jam Server Memasak Halaman:</strong> {waktuRakit} <br />
        <em>(Setiap kali kamu menekan tombol Refresh browser, detik jam di atas PASTI langsung berubah!)</em>
      </p>

      <ul>
        {antreanKrs.map((tugas) => (
          <li key={tugas.id}>
            Tiket #{tugas.id}: {tugas.title} —{' '}
            <strong>{tugas.completed ? '✅ Selesai' : '⏳ Mengantre'}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}