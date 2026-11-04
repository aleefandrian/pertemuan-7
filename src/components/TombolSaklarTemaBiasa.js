export function TombolSaklarTemaBiasa({ setTemaGelap, temaGelap }) {

    return (
        <button
            onClick={() => setTemaGelap(!temaGelap)}
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
