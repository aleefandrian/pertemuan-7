'use client';

import { useState, useEffect } from 'react';

export default function HalamanInventarisLab() {
  const [daftarBarang, setDaftarBarang] = useState([]);
  const [loading, setLoading] = useState(true);


    const [kataKunci, setKataKunci] = useState('');
const [kondisiPilihan, setKondisiPilihan] = useState("Semua");
  

 async function muatDataBarang() {
  setLoading(true);

  try {
    const params = new URLSearchParams({
      search: kataKunci,
      kondisi: kondisiPilihan,
    });

    const res = await fetch(`/api/inventaris?${params}`);

    if (!res.ok) {
      throw new Error('Gagal mengambil data inventaris');
    }

    const data = await res.json();
    setDaftarBarang(data);

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

    const [kondisiBarang, setKondisiBarang] = useState(() => {
    if (typeof window !== 'undefined') {
      const kondisiBarang = localStorage.getItem('kondisiBarang');
      if (kondisiBarang) {
        try {
          return JSON.parse(kondisiBarang);
        } catch (error) {
          console.error('Gagal memparsing data:', error);
          return [];
        }
      }
      return [];
    }
    return [];
  });



  // State untuk Form Input
  const [idEdit, setIdEdit] = useState(null);
  const [kode, setKode] = useState('');
  const [nama, setNama] = useState('');
  const [stok, setStok] = useState(1);
  const [kondisi, setKondisi] = useState('Baik');

  
useEffect(() => {
  muatDataBarang();
}, [kataKunci, kondisiPilihan]);

  // 2. CREATE (POST) & 3. UPDATE (PUT)
  async function simpanBarang(e) {
    e.preventDefault();
    const payload = { kode, nama, stok, kondisi };

    if (idEdit !== null) {
      // Mode Update (PUT)
      const res = await fetch(`/api/inventaris/${idEdit}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),

      });
      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Perubahan data barang berhasil disimpan.',
          timer: 2000,
          showConfirmButton: false
        });
      }
      
    } else {
      // Mode Create (POST)
      await fetch('/api/inventaris', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
       window.alert("Sukses Menambahkan data")
    }

    resetForm();
    muatDataBarang();
  }

  // 4. DELETE (DELETE)
  async function hapusBarang(id, namaBarang) {
    if (!confirm(`Yakin ingin menghapus "${namaBarang}" dari inventaris lab?`)) return;
    await fetch(`/api/inventaris/${id}`, { method: 'DELETE' });
    muatDataBarang();
  }

  function pilihUntukEdit(barang) {
    setIdEdit(barang.id);
    setKode(barang.kode);
    setNama(barang.nama);
    setStok(barang.stok);
    setKondisi(barang.kondisi);
  }

  function resetForm() {
    setIdEdit(null);
    setKode('');
    setNama('');
    setStok(1);
    setKondisi('Baik');
  }

  return (
    <div style={{ padding: '24px' }}>
      <h1>🖥️ Sistem Inventaris Laboratorium Komputer (Full CRUD)</h1>

      {/* FORM TAMBAH / EDIT BARANG */}
      <form onSubmit={simpanBarang} style={{ background: '#eff6ff', padding: '20px', borderRadius: '10px', marginBottom: '24px', border: '1px solid #bfdbfe' }}>
        <h3 style={{ marginTop: 0 }}>
          {idEdit ? '✏️ Edit Data Barang Lab' : '➕ Tambah Barang Baru'}
        </h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input placeholder="Kode (Misal: LAB-04)" value={kode} onChange={(e) => setKode(e.target.value)} required style={{ padding: '8px' }} />
          <input placeholder="Nama Alat Lab" value={nama} onChange={(e) => setNama(e.target.value)} required style={{ padding: '8px', flex: 1 }} />
          <input type="number" placeholder="Stok" value={stok} onChange={(e) => setStok(e.target.value)} min="0" style={{ padding: '8px', width: '70px' }} />
          <select value={kondisi} onChange={(e) => setKondisi(e.target.value)} style={{ padding: '8px' }}>
            <option value="Baik">Baik</option>
            <option value="Perlu Cek">Perlu Cek</option>
            <option value="Rusak">Rusak</option>
          </select>
          <button type="submit" style={{ background: '#1e40af', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>
            {idEdit ? 'Simpan Perubahan' : 'Tambah Barang'}
          </button>
          {idEdit && (
            <button type="button" onClick={resetForm} style={{ padding: '8px 12px' }}>Batal</button>
          )}
        </div>
      </form>


      <div>
   <div style={{
  display: 'flex',
  gap: '12px',
  marginBottom: '20px'
}}>
  {/* Search Bar */}
  <input
    type="text"
    placeholder="🔍 Cari kode atau nama barang..."
    value={kataKunci}
    onChange={(e) => setKataKunci(e.target.value)}
    style={{
      padding: '10px',
      flex: 1,
      borderRadius: '6px',
      border: '1px solid #93c5fd'
    }}
  />

  {/* Filter Kategori */}
 <select
  value={kondisiPilihan}
  onChange={(e) => setKondisiPilihan(e.target.value)}
  style={{
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #93c5fd'
  }}
>
  <option value="Semua">Semua Kondisi</option>
  <option value="Baik">Baik</option>
  <option value="Perlu Cek">Perlu Cek</option>
  <option value="Rusak">Rusak</option>
</select>

</div>

      

      </div>

      {/* TABEL DAFTAR BARANG */}
      {loading ? <p>⏳ Sedang mengambil data dari REST API...</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#1e3a8a', color: 'white' }}>
              <th style={{ padding: '10px' }}>Kode</th>
              <th style={{ padding: '10px' }}>Nama Perangkat</th>
              <th style={{ padding: '10px' }}>Stok</th>
              <th style={{ padding: '10px' }}>Kondisi</th>
              <th style={{ padding: '10px' }}>Aksi CRUD</th>
            </tr>
          </thead>
          <tbody>
            {daftarBarang.map((b) => (
              <tr key={b.id} style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>{b.kode}</td>
                <td style={{ padding: '10px' }}>{b.nama}</td>
                <td style={{ padding: '10px' }}>{b.stok} Unit</td>
                <td style={{ padding: '10px' }}>{b.kondisi}</td>
                <td style={{ padding: '10px' }}>
                  <button onClick={() => pilihUntukEdit(b)} style={{ marginRight: '8px' }}>✏️ Edit</button>
                  <button onClick={() => hapusBarang(b.id, b.nama)} style={{ color: '#dc2626' }}>🗑️ Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}