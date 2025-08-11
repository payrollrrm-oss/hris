# Sistem HRIS - Manajemen Karyawan

Aplikasi web responsif untuk sistem Human Resource Information System (HRIS) dengan database Google Sheets dan backend Google Apps Script.

## Fitur Utama

### 1. Modul Data Karyawan
- Tabel data dengan kolom: NO, NRP, NAMA, EMAIL, STATUS PERNIKAHAN, JABATAN, UNDER, STATUS KARYAWAN, ROLE
- Data tersimpan di Google Sheet (sheet "DataKaryawan")
- ROLE: karyawan (frontend) dan admin (backend)
- Admin bisa menambah, mengedit, menghapus data karyawan

### 2. Modul Absensi dan Shift Kerja
- Status absen: Hadir Masuk, Hadir Pulang, Off, Sakit, Alfa, Cuti, Induksi, MCU
- Cuti dengan tanggal awal dan akhir
- Shift kerja: Shift 1 dan Shift 2
- Karyawan bisa input absensi via frontend
- Admin bisa lihat rekap absensi bulanan
- Data tersimpan di Google Sheet (sheet "Absensi")

### 3. Modul Pelaporan K3
- Form pelaporan: Nama Pelapor, Tanggal Laporan, Uraian Laporan, Foto Laporan, Status Proses
- Data tersimpan di Google Sheet (sheet "LaporanK3")
- Admin bisa proses laporan dan ubah status

### 4. Modul Permohonan MCU
- Form: Nama Pemohon, Tanggal Permohonan, Alasan MCU, Tanggal Rencana MCU, Status Proses
- Data tersimpan di Google Sheet (sheet "PermohonanMCU")
- Admin bisa proses status permohonan

### 5. Modul Permintaan APD
- Form: Nama Pemohon, Tanggal Permintaan, Nomor Sepatu, Nomor Baju, Nomor Celana, Kacamata, Warna Helm, Status Proses
- Data tersimpan di Google Sheet (sheet "PermintaanAPD")
- Admin bisa proses status permintaan

### 6. Autentikasi dan Role Access
- Login berdasarkan email di sheet DataKaryawan
- Karyawan: akses form absensi, laporan K3, permohonan MCU, permintaan APD
- Admin: akses semua modul termasuk data master dan rekap laporan

## Teknologi yang Digunakan

- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Backend**: Google Apps Script
- **Database**: Google Sheets
- **Deployment**: Google Apps Script Web App

## Setup dan Instalasi

### Langkah 1: Buat Google Spreadsheet

1. Buka [Google Sheets](https://sheets.google.com)
2. Buat spreadsheet baru
3. Salin ID spreadsheet dari URL (format: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`)
4. Catat ID spreadsheet untuk digunakan nanti

### Langkah 2: Setup Google Apps Script

1. Buka [Google Apps Script](https://script.google.com)
2. Buat project baru
3. Ganti nama project menjadi "HRIS System"
4. Hapus semua kode default
5. Copy-paste isi file `Code.gs` ke editor
6. Ganti `YOUR_SPREADSHEET_ID` dengan ID spreadsheet yang sudah dibuat

### Langkah 3: Setup Spreadsheet Structure

1. Di Google Apps Script, pilih fungsi `setupSpreadsheet` dari dropdown
2. Klik tombol "Run" untuk menjalankan fungsi
3. Berikan izin yang diperlukan
4. Fungsi ini akan membuat 5 sheet dengan struktur yang diperlukan:
   - DataKaryawan
   - Absensi
   - LaporanK3
   - PermohonanMCU
   - PermintaanAPD

### Langkah 4: Deploy Web App

1. Di Google Apps Script, klik "Deploy" > "New deployment"
2. Pilih "Web app" sebagai type
3. Set "Execute as" ke "Me"
4. Set "Who has access" ke "Anyone"
5. Klik "Deploy"
6. Copy URL yang dihasilkan

### Langkah 5: Update Frontend

1. Buka file `config.js`
2. Set nilai `CONFIG.SCRIPT_URL` dengan URL Web App dari langkah 4, contoh:
   `SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbx.../exec'`
3. Simpan file

### Langkah 6: Upload Frontend Files

1. Upload semua file frontend ke hosting web atau gunakan GitHub Pages:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `modules.js`
   - `functions.js`

2. Atau gunakan layanan hosting gratis seperti:
   - Netlify
   - Vercel
   - GitHub Pages
   - Firebase Hosting

## Struktur File

```
HRISRRM/
├── index.html          # File HTML utama
├── styles.css          # File CSS untuk styling
├── script.js           # File JavaScript utama
├── modules.js          # File JavaScript untuk modul-modul
├── functions.js        # File JavaScript untuk fungsi-fungsi
├── Code.gs             # File Google Apps Script backend
└── README.md           # Dokumentasi
```

## Struktur Database (Google Sheets)

### Sheet: DataKaryawan
| NRP | NAMA | EMAIL | STATUS PERNIKAHAN | JABATAN | UNDER | STATUS KARYAWAN | ROLE |
|-----|------|-------|-------------------|---------|-------|-----------------|------|

### Sheet: Absensi
| ID | TANGGAL | EMAIL | NAMA | STATUS | SHIFT | KETERANGAN |
|----|---------|-------|------|--------|-------|------------|

### Sheet: LaporanK3
| ID | TANGGAL | EMAIL | PELAPOR | URAIAN | FOTO | STATUS |
|----|---------|-------|---------|--------|------|--------|

### Sheet: PermohonanMCU
| ID | TANGGAL | EMAIL | PEMOHON | ALASAN | TANGGAL RENCANA | STATUS |
|----|---------|-------|---------|--------|-----------------|--------|

### Sheet: PermintaanAPD
| ID | TANGGAL | EMAIL | PEMOHON | NOMOR SEPATU | NOMOR BAJU | NOMOR CELANA | KACAMATA | WARNA HELM | STATUS |
|----|---------|-------|---------|--------------|------------|--------------|----------|------------|--------|

## Cara Penggunaan

### Login
1. Buka aplikasi di browser
2. Masukkan email yang terdaftar di sheet DataKaryawan
3. Sistem akan otomatis mendeteksi role (admin/karyawan)

### Untuk Karyawan
1. **Absensi**: Input status kehadiran harian
2. **Laporan K3**: Buat laporan kondisi tidak aman
3. **Permohonan MCU**: Ajukan permohonan MCU
4. **Permintaan APD**: Ajukan permintaan APD

### Untuk Admin
1. **Data Karyawan**: Kelola data master karyawan
2. **Absensi**: Lihat rekap absensi semua karyawan
3. **Laporan K3**: Proses dan update status laporan
4. **Permohonan MCU**: Approve/reject permohonan MCU
5. **Permintaan APD**: Approve/reject permintaan APD
6. **Laporan**: Generate laporan bulanan

## Fitur Responsif

Aplikasi dirancang responsif untuk:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## Keamanan

- Autentikasi berdasarkan email di database
- Role-based access control
- Validasi input di frontend dan backend
- Sanitasi data sebelum disimpan ke database

## Troubleshooting

### Error "Spreadsheet not found"
- Pastikan ID spreadsheet sudah benar
- Pastikan spreadsheet sudah di-share dengan akun Google Apps Script

### Error "Permission denied"
- Pastikan Google Apps Script sudah di-deploy dengan permission yang benar
- Pastikan spreadsheet sudah di-share dengan permission "Editor"

### Data tidak muncul
- Pastikan struktur sheet sudah benar
- Jalankan fungsi `setupSpreadsheet()` untuk membuat struktur
- Cek console browser untuk error JavaScript

### Login tidak berfungsi
- Pastikan email ada di sheet DataKaryawan
- Pastikan URL Google Apps Script sudah benar di `script.js`

## Pengembangan Lanjutan

### Fitur yang bisa ditambahkan:
1. Export data ke Excel/PDF
2. Notifikasi email otomatis
3. Dashboard dengan grafik
4. Backup data otomatis
5. Multi-language support
6. Audit trail
7. API untuk integrasi dengan sistem lain

### Optimasi yang bisa dilakukan:
1. Implementasi caching
2. Pagination untuk data besar
3. Search dan filter advanced
4. Real-time updates
5. Progressive Web App (PWA)

## Kontribusi

Untuk berkontribusi pada project ini:
1. Fork repository
2. Buat branch untuk fitur baru
3. Commit perubahan
4. Push ke branch
5. Buat Pull Request

## Lisensi

Project ini menggunakan lisensi MIT. Lihat file LICENSE untuk detail lebih lanjut.

## Support

Jika ada pertanyaan atau masalah, silakan:
1. Cek dokumentasi ini
2. Cek console browser untuk error
3. Cek logs Google Apps Script
4. Buat issue di repository

## Changelog

### v1.0.0 (2024-01-01)
- Initial release
- Fitur dasar HRIS
- Integrasi Google Sheets
- Responsive design
- Role-based access control
