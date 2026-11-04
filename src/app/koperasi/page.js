"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import TombolTema from "@/components/TombolTema";
import { useTemaStore } from "@/store/useTemaStore";

const daftarProdukKampus = [
  {
    id: 1,
    nama: "Jas Almamater Politeknik Takumi",
    harga: 195000,
    kategori: "Atribut",
  },
  {
    id: 2,
    nama: "Kaos Polo Official Prodi TI",
    harga: 110000,
    kategori: "Pakaian",
  },
  {
    id: 3,
    nama: "Lanyard + ID Card Holder Kulit",
    harga: 35000,
    kategori: "Aksesoris",
  },
  {
    id: 4,
    nama: "Modul Cetak Pemrograman Web 3",
    harga: 65000,
    kategori: "Buku",
  },
];

export default function HalamanKoperasi() {
  const { temaGelap } = useTemaStore();
  const { keranjang, tambahBarang, kurangiBarang, resetKeranjang } =
    useCartStore();

  // Menghitung total item dan total harga secara otomatis
  const totalUnit = keranjang.reduce((sum, item) => sum + item.qty, 0);
  const totalRupiah = keranjang.reduce(
    (sum, item) => sum + item.harga * item.qty,
    0,
  );

  return (
    <div
      style={{ padding: "24px", padding: '24px', 
      backgroundColor: temaGelap ? '#0f172a' : '#ffffff', 
      color: temaGelap ? '#f8fafc' : '#0f172a',
      minHeight: '100vh' }}
    >
      {/* Header Status Keranjang Global */}
      <div
        style={{
          background: "#1e3a8a",
          color: "white",
          padding: "16px 24px",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>
            🛍️ E-Koperasi Mahasiswa Takumi (Zustand Store)
          </h2>
          <small>
            Data keranjang tersimpan otomatis meskipun halaman di-refresh!
          </small>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            🛒 {totalUnit} Barang | Rp {totalRupiah.toLocaleString("id-ID")}
          </div>
          <div>
            <TombolTema />
          </div>

          <Link
            href="/koperasi/checkout"
            style={{ color: "#fde047", fontSize: "14px" }}
          >
            Lanjut ke Halaman Checkout →
          </Link>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: "24px",
        }}
      >
        {/* Kolom Kiri: Daftar Produk */}
        <div>
          <h3>Daftar Merchandise Tersedia:</h3>
          {daftarProdukKampus.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #cbd5e1",
                padding: "14px",
                borderRadius: "8px",
                marginBottom: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{p.nama}</strong>
                <br />
                <span style={{ color: "#2563eb", fontWeight: "bold" }}>
                  Rp {p.harga.toLocaleString("id-ID")}
                </span>
              </div>
              <button
                onClick={() => tambahBarang(p)}
                style={{
                  background: "#16a34a",
                  color: "white",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                + Tambah
              </button>
            </div>
          ))}
        </div>

        {/* Kolom Kanan: Rincian Keranjang */}
        <div
          style={{
            background: temaGelap ? '#1e293b' : '#ffffff',
            padding: "20px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
          }}
        >
          <h3 style={{ marginTop: 0 }}>🧾 Ringkasan Keranjang Belanja</h3>
          {keranjang.length === 0 ? (
            <p style={{ color: "#64748b" }}>
              Keranjang masih kosong. Silakan pilih barang di sebelah kiri.
            </p>
          ) : (
            <>
              {keranjang.map((item) => (
                <div
                  key={item.id}
                  style={{
                    borderBottom: "1px solid #e2e8f0",
                    paddingBottom: "10px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong>{item.nama}</strong>
                    <br />
                    <small>
                      {item.qty} x Rp {item.harga.toLocaleString("id-ID")}
                    </small>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "6px",
                      alignItems: "center",
                    }}
                  >
                    <button onClick={() => kurangiBarang(item.id)}>-</button>
                    <strong>{item.qty}</strong>
                    <button onClick={() => tambahBarang(item)}>+</button>
                  </div>
                </div>
              ))}
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                Total Tagihan: Rp {totalRupiah.toLocaleString("id-ID")}
              </p>
              <button
                onClick={resetKeranjang}
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                🗑️ Kosongkan Keranjang
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
