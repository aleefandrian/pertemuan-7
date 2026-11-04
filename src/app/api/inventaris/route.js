import { NextResponse } from 'next/server';
import { dataInventaris } from '@/lib/dbInventaris';

// 1. Fungsi READ (GET) -> Mengambil seluruh daftar barang
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get('search') || '';
  const kondisi = searchParams.get('kondisi') || 'Semua';

  let hasil = [...dataInventaris];

  if (search) {
    hasil = hasil.filter((barang) =>
      barang.nama.toLowerCase().includes(search.toLowerCase()) ||
      barang.kode.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (kondisi !== 'Semua') {
    hasil = hasil.filter(
      (barang) => barang.kondisi === kondisi
    );
  }

  return NextResponse.json(hasil, { status: 200 });
}

// 2. Fungsi CREATE (POST) -> Menambahkan barang baru ke server
export async function POST(request) {
  const body = await request.json();

  if (!body.kode || !body.nama) {
    return NextResponse.json({ pesan: 'Kode dan Nama barang wajib diisi!' }, { status: 400 });
  }

  const barangBaru = {
    id: Date.now(),
    kode: body.kode,
    nama: body.nama,
    stok: Number(body.stok) || 1,
    kondisi: body.kondisi || 'Baik',
  };

  dataInventaris.push(barangBaru);
  return NextResponse.json(barangBaru, { status: 201 });
}