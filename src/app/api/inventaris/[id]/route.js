import { NextResponse } from 'next/server';
import { dataInventaris } from '@/lib/dbInventaris';

// 3. Fungsi UPDATE (PUT) -> Mengubah data barang berdasarkan [id]
export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const index = dataInventaris.findIndex((item) => item.id === Number(id));

  if (index === -1) {
    return NextResponse.json({ pesan: 'Barang tidak ditemukan' }, { status: 404 });
  }

  dataInventaris[index] = {
    ...dataInventaris[index],
    kode: body.kode,
    nama: body.nama,
    stok: Number(body.stok),
    kondisi: body.kondisi,
  };

  return NextResponse.json(dataInventaris[index], { status: 200 });
}

// 4. Fungsi DELETE (DELETE) -> Menghapus barang berdasarkan [id]
export async function DELETE(request, { params }) {
  const { id } = await params;
  const index = dataInventaris.findIndex((item) => item.id === Number(id));

  if (index === -1) {
    return NextResponse.json({ pesan: 'Barang tidak ditemukan' }, { status: 404 });
  }

  dataInventaris.splice(index, 1);
  return NextResponse.json({ pesan: 'Berhasil dihapus' }, { status: 200 });
}