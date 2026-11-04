"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useState } from "react";

export default function HalamanCheckout() {
  const {
    keranjang,
    resetKeranjang,
    diskonPersen,
    kodeVoucher,
    terapkanVoucher,
  } = useCartStore();
  const [inputVoucher, setInputVoucher] = useState("");
  
  const subTotal = keranjang.reduce(
    (sum, item) => sum + item.harga * item.qty,
    0,
  );

  // Hitung nominal potongan harga (misal: 20% dari subTotal)
  const jumlahDiskon = (subTotal * diskonPersen) / 100;
  // Total akhir setelah dipotong diskon
  const totalBayar = subTotal - jumlahDiskon;

  return (
    <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>💳 Halaman Checkout Pembayaran</h1>
      <p>
        Perhatikan: Meskipun kita sudah pindah halaman, data dari Zustand tetap
        terbaca utuh!
      </p>

      <ul>
        {keranjang.map((item) => (
          <li key={item.id}>
            {item.nama} ({item.qty} pcs) —{" "}
            <strong>
              Rp {(item.harga * item.qty).toLocaleString("id-ID")}
            </strong>
          </li>
        ))}
      </ul>

      <br />

      <h3>Masukkan Kode Voucher Diskon</h3>
      <input
        type="text"
        placeholder="Masukkan kode voucher..."
        value={inputVoucher}
        onChange={(e) => setInputVoucher(e.target.value)}
        style={{
          padding: "8px",
          width: "100%",
          marginBottom: "12px",
          borderRadius: "6px",
          border: "1px solid #cbd5e1",
        }}
      />

      <br />

      <div style={{ display: "flex", gap: "12px" }}>
        <Link
          href="/koperasi"
          style={{
            padding: "10px 16px",
            background: "#e2e8f0",
            borderRadius: "6px",
            textDecoration: "none",
            color: "#0f172a",
          }}
        >
          ← Kembali Belanja
        </Link>
        <button
          onClick={() => terapkanVoucher(inputVoucher)}
          style={{
            padding: "10px 20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Gunakan Voucher
        </button>
        <button
          onClick={() => {
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              html: "Pembayaran Berhasil!<br/>Terima kasih sudah berbelanja di Koperasi Takumi.",
              timer: 2000,
              showConfirmButton: false,
            });
            resetKeranjang();
          }}
          style={{
            padding: "8px 16px",
            background: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ✅ Bayar Sekarang
        </button>
      </div>

      <br />
      <hr />
      <br />
      <p>Subtotal: Rp {subTotal.toLocaleString("id-ID")}</p>
      {/* Menampilkan persentase dan nominal potongan diskon yang benar */}
      <p>
        Diskon ({diskonPersen}% - {kodeVoucher || "Belum ada"}): - Rp{" "}
        {jumlahDiskon.toLocaleString("id-ID")}
      </p>
      <h3>Total yang Harus Dibayar: Rp {totalBayar.toLocaleString("id-ID")}</h3>
    </div>
  );
}