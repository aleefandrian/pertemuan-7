import { TombolSaklarTemaBiasa } from "./TombolSaklarTemaBiasa";

export default function TemaComponent({ temaGelap, setTemaGelap }) {
    return (
        <div style={{ padding: '32px' }}>
            <h1>🎨 Eksperimen React Context API (Dark / Light Mode)</h1>
            <p>Klik tombol di bawah ini untuk mengubah tema seluruh layar tanpa mengoper props:</p>
            <TombolSaklarTemaBiasa setTemaGelap={setTemaGelap} temaGelap={temaGelap} />
        </div>
    )
}
