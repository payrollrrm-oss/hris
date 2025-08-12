// Configuration for HRIS System
const CONFIG = {
    // Google Apps Script Web App URL (akan diisi setelah deploy)
    SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
    
    // Google Sheets ID (akan diisi setelah setup)
    SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID',
    
    // Sheet names
    SHEETS: {
        EMPLOYEES: 'DataKaryawan',
        ATTENDANCE: 'Absensi',
        K3_REPORTS: 'LaporanK3',
        MCU_REQUESTS: 'PermohonanMCU',
        APD_REQUESTS: 'PermintaanAPD'
    },
    
    // Status types
    ATTENDANCE_STATUSES: [
        'Hadir Masuk',
        'Hadir Pulang', 
        'Off',
        'Sakit',
        'Alfa',
        'Cuti',
        'Induksi',
        'MCU'
    ],
    
    WORK_SHIFTS: ['Shift 1', 'Shift 2'],
    
    K3_STATUSES: ['Belum', 'Selesai'],
    
    REQUEST_STATUSES: ['Pending', 'Disetujui', 'Ditolak'],
    
    // Roles
    ROLES: {
        EMPLOYEE: 'karyawan',
        ADMIN: 'admin'
    },
    
    // Marital statuses
    MARITAL_STATUSES: ['Lajang', 'Menikah', 'Cerai'],
    
    // Employee statuses
    EMPLOYEE_STATUSES: ['Aktif', 'Nonaktif'],
    
    // APD options
    APD_OPTIONS: {
        SHIRT_SIZES: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        PANTS_SIZES: ['28', '30', '32', '34', '36', '38', '40'],
        GLASSES_OPTIONS: ['Ya', 'Tidak'],
        HELMET_COLORS: ['Putih', 'Kuning', 'Merah', 'Biru', 'Hijau']
    },
    
    // UI settings
    UI: {
        ITEMS_PER_PAGE: 10,
        DATE_FORMAT: 'DD/MM/YYYY',
        TIME_FORMAT: 'HH:mm'
    },
    
    // Validation
    VALIDATION: {
        EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        NRP_REGEX: /^[A-Z0-9]{6,10}$/
    },
    
    // Messages
    MESSAGES: {
        LOADING: 'Memuat data...',
        SUCCESS: 'Data berhasil disimpan',
        ERROR: 'Terjadi kesalahan',
        CONFIRM_DELETE: 'Apakah Anda yakin ingin menghapus data ini?',
        LOGIN_REQUIRED: 'Silakan login terlebih dahulu',
        ACCESS_DENIED: 'Anda tidak memiliki akses ke fitur ini'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
