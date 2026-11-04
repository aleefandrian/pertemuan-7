import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      keranjang: [],
      diskonPersen: 0,
      kodeVoucher: "",

      // 1. Tambah Barang (Jika sudah ada di keranjang, tambahkan qty-nya)
      tambahBarang: (produk) => {
        const daftarSekarang = get().keranjang;
        const sudahAda = daftarSekarang.find((item) => item.id === produk.id);

        if (sudahAda) {
          set({
            keranjang: daftarSekarang.map((item) =>
              item.id === produk.id ? { ...item, qty: item.qty + 1 } : item,
            ),
          });
        } else {
          set({ keranjang: [...daftarSekarang, { ...produk, qty: 1 }] });
        }
      },

      // 2. Kurangi Qty atau Hapus Barang jika qty sisa 1
      kurangiBarang: (idProduk) => {
        const daftarSekarang = get().keranjang;
        const target = daftarSekarang.find((item) => item.id === idProduk);

        if (target && target.qty > 1) {
          set({
            keranjang: daftarSekarang.map((item) =>
              item.id === idProduk ? { ...item, qty: item.qty - 1 } : item,
            ),
          });
        } else {
          set({
            keranjang: daftarSekarang.filter((item) => item.id !== idProduk),
          });
        }
      },

      terapkanVoucher: (kode) => {
        const kodeBersih = kode.trim().toUpperCase();
        if (kodeBersih == "TAKUMIHEBAT") {
          set({ kodeVoucher: kodeBersih, diskonPersen: 20 });
          Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: "Voucher berhasil digunakan! Diskon 20%",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: "Kode voucher tidak valid!",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      },

      // 3. Kosongkan Semua Keranjang
      resetKeranjang: () =>
        set({ keranjang: [], diskonPersen: 0, kodeVoucher: "" }),
    }),
    {
      name: "penyimpanan-keranjang-takumi",
    },
  ),
);
