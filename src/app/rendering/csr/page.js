import AntreanKrs from "@/components/AntreanKrs";

export default async function HalamanCSR() {
  const waktuRakit = new Date().toLocaleTimeString("id-ID");

  return (
    <div style={{ padding: "24px" }}>
      <span
        style={{
          background: "#dbeafe",
          color: "#1e40af",
          padding: "4px 10px",
          borderRadius: "4px",
          fontWeight: "bold",
        }}
      >
        MODE: CSR (Client-Side Rendering Real-Time)
      </span>
      <h1>⚡ Pantauan Antrean Server KRS (Real-Time)</h1>
      <p>
        <strong>Jam Server Memasak Halaman:</strong> {waktuRakit} <br />
        <em>
          (Setiap kali kamu menekan tombol Refresh browser, detik jam di atas
          PASTI langsung berubah!)
        </em>
      </p>

      <AntreanKrs />
    </div>
  );
}