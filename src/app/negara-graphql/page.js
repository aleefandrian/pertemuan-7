export default async function HalamanNegaraGraphQL() {
  // Kita hanya meminta kolom code, name, capital, dan currency milik negara ASEAN!
  const queryGraphQL = `
    query {
      countries(filter: { code: { in: ["ID", "MY", "SG", "JP"] } }) {
        code
        name
        capital
        currency
      }
    }
  `;

  const res = await fetch('https://countries.trevorblades.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: queryGraphQL }),
  });

  const hasil = await res.json();
  const daftarNegara = hasil.data.countries;

  return (
    <div style={{ padding: '24px' }}>
      <h1>🌏 Eksperimen Integrasi GraphQL API</h1>
      <p>Data di bawah ini diambil menggunakan 1 endpoint GraphQL sesuai kolom yang kita pilih:</p>
      <ul>
        {daftarNegara.map((n) => (
          <li key={n.code}>
            <strong>{n.name} ({n.code})</strong> — Ibu Kota: {n.capital} • Mata Uang: {n.currency}
          </li>
        ))}
      </ul>
    </div>
  );
}