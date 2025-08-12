/**
 * HRIS System - Google Apps Script Backend
 * 
 * File ini berisi semua fungsi backend untuk aplikasi HRIS
 * yang terhubung ke Google Sheets sebagai database
 * 
 * Sheet yang digunakan:
 * - DataKaryawan: Data master karyawan
 * - Absensi: Data absensi dan shift kerja
 * - LaporanK3: Data laporan kondisi tidak aman dan tindakan tidak aman
 * - PermohonanMCU: Data permohonan MCU
 * - PermintaanAPD: Data permintaan APD
 */

// Konfigurasi Spreadsheet ID (ganti dengan ID spreadsheet Anda)
const SPREADSHEET_ID = '1reJE02HnF1HONZYvx377xpHeOi4at2-GrHyMNeoepmI';

// Nama-nama sheet
const SHEETS = {
  EMPLOYEES: 'DataKaryawan',
  ATTENDANCE: 'Absensi',
  K3_REPORTS: 'LaporanK3',
  MCU_REQUESTS: 'PermohonanMCU',
  APD_REQUESTS: 'PermintaanAPD'
};

/**
 * Fungsi utama untuk menangani request dari frontend
 */
function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'noop';
    
    switch(action) {
      case 'login':
        return handleLogin(e && e.parameter ? e.parameter.email : '');
      case 'getDashboardData':
        return handleGetDashboardData();
      case 'getEmployees':
        return handleGetEmployees();
      case 'getAttendance':
        return handleGetAttendance(e && e.parameter ? e.parameter.email : '');
      case 'getK3Reports':
        return handleGetK3Reports(e && e.parameter ? e.parameter.email : '');
      case 'getMcuRequests':
        return handleGetMcuRequests(e && e.parameter ? e.parameter.email : '');
      case 'getApdRequests':
        return handleGetApdRequests(e && e.parameter ? e.parameter.email : '');
      case 'noop':
        // Dipanggil ketika doGet dijalankan manual dari editor tanpa parameter
        return createResponse(true, 'Web App aktif. Tambahkan parameter ?action=... pada URL atau jalankan fungsi setupSpreadsheet dari editor untuk membuat sheet.');
      default:
        return createResponse(false, 'Action tidak valid');
    }
  } catch (error) {
    console.error('Error in doGet:', error);
    return createResponse(false, 'Terjadi kesalahan server');
  }
}

/**
 * Fungsi untuk menangani POST request
 */
function doPost(e) {
  try {
    const queryAction = (e && e.parameter && e.parameter.action) ? e.parameter.action : null;
    const body = (e && e.postData && e.postData.contents) ? JSON.parse(e.postData.contents) : {};
    const action = body.action || queryAction;

    switch(action) {
      case 'saveEmployee':
        return handleSaveEmployee(body);
      case 'saveAttendance':
        return handleSaveAttendance(body);
      case 'saveK3Report':
        return handleSaveK3Report(body);
      case 'saveMcuRequest':
        return handleSaveMcuRequest(body);
      case 'saveApdRequest':
        return handleSaveApdRequest(body);
      case 'updateK3Status':
        return handleUpdateK3Status(body);
      case 'updateMcuStatus':
        return handleUpdateMcuStatus(body);
      case 'updateApdStatus':
        return handleUpdateApdStatus(body);
      case 'deleteEmployee':
        return handleDeleteEmployee(body);
      case 'deleteAttendance':
        return handleDeleteAttendance(body);
      default:
        return createResponse(false, 'Action tidak valid atau tidak ditemukan');
    }
  } catch (error) {
    console.error('Error in doPost:', error);
    return createResponse(false, 'Terjadi kesalahan server');
  }
}

/**
 * Fungsi untuk menangani login
 */
function handleLogin(email) {
  try {
    const employees = getEmployeesData();
    const employee = employees.find(emp => emp.email === email);
    
    if (employee) {
      return createResponse(true, 'Login berhasil', {
        user: {
          email: employee.email,
          nama: employee.nama,
          role: employee.role,
          nrp: employee.nrp,
          jabatan: employee.jabatan
        }
      });
    } else {
      return createResponse(false, 'Email tidak ditemukan dalam sistem');
    }
  } catch (error) {
    console.error('Error in handleLogin:', error);
    return createResponse(false, 'Terjadi kesalahan saat login');
  }
}

/**
 * Fungsi untuk mendapatkan data dashboard
 */
function handleGetDashboardData() {
  try {
    const employees = getEmployeesData();
    const attendance = getAttendanceData();
    const k3Reports = getK3ReportsData();
    const mcuRequests = getMcuRequestsData();
    const apdRequests = getApdRequestsData();
    
    const today = new Date().toISOString().split('T')[0];
    const presentToday = attendance.filter(att => 
      att.tanggal === today && (att.status === 'Hadir Masuk' || att.status === 'Hadir Pulang')
    ).length;
    
    const pendingRequests = [
      ...mcuRequests.filter(req => req.status === 'Pending'),
      ...apdRequests.filter(req => req.status === 'Pending')
    ].length;
    
    return createResponse(true, 'Data dashboard berhasil dimuat', {
      totalEmployees: employees.length,
      presentToday: presentToday,
      pendingRequests: pendingRequests,
      k3Reports: k3Reports.length
    });
  } catch (error) {
    console.error('Error in handleGetDashboardData:', error);
    return createResponse(false, 'Terjadi kesalahan saat memuat data dashboard');
  }
}

/**
 * Fungsi untuk mendapatkan data karyawan
 */
function handleGetEmployees() {
  try {
    const employees = getEmployeesData();
    return createResponse(true, 'Data karyawan berhasil dimuat', { employees });
  } catch (error) {
    console.error('Error in handleGetEmployees:', error);
    return createResponse(false, 'Terjadi kesalahan saat memuat data karyawan');
  }
}

/**
 * Fungsi untuk mendapatkan data absensi
 */
function handleGetAttendance(email) {
  try {
    const attendance = getAttendanceData();
    let filteredAttendance = attendance;
    
    // Jika bukan admin, filter berdasarkan email
    if (email) {
      filteredAttendance = attendance.filter(att => att.email === email);
    }
    
    return createResponse(true, 'Data absensi berhasil dimuat', { attendance: filteredAttendance });
  } catch (error) {
    console.error('Error in handleGetAttendance:', error);
    return createResponse(false, 'Terjadi kesalahan saat memuat data absensi');
  }
}

/**
 * Fungsi untuk mendapatkan data laporan K3
 */
function handleGetK3Reports(email) {
  try {
    const reports = getK3ReportsData();
    let filteredReports = reports;
    
    // Jika bukan admin, filter berdasarkan email
    if (email) {
      filteredReports = reports.filter(report => report.email === email);
    }
    
    return createResponse(true, 'Data laporan K3 berhasil dimuat', { reports: filteredReports });
  } catch (error) {
    console.error('Error in handleGetK3Reports:', error);
    return createResponse(false, 'Terjadi kesalahan saat memuat data laporan K3');
  }
}

/**
 * Fungsi untuk mendapatkan data permohonan MCU
 */
function handleGetMcuRequests(email) {
  try {
    const requests = getMcuRequestsData();
    let filteredRequests = requests;
    
    // Jika bukan admin, filter berdasarkan email
    if (email) {
      filteredRequests = requests.filter(req => req.email === email);
    }
    
    return createResponse(true, 'Data permohonan MCU berhasil dimuat', { requests: filteredRequests });
  } catch (error) {
    console.error('Error in handleGetMcuRequests:', error);
    return createResponse(false, 'Terjadi kesalahan saat memuat data permohonan MCU');
  }
}

/**
 * Fungsi untuk mendapatkan data permintaan APD
 */
function handleGetApdRequests(email) {
  try {
    const requests = getApdRequestsData();
    let filteredRequests = requests;
    
    // Jika bukan admin, filter berdasarkan email
    if (email) {
      filteredRequests = requests.filter(req => req.email === email);
    }
    
    return createResponse(true, 'Data permintaan APD berhasil dimuat', { requests: filteredRequests });
  } catch (error) {
    console.error('Error in handleGetApdRequests:', error);
    return createResponse(false, 'Terjadi kesalahan saat memuat data permintaan APD');
  }
}

/**
 * Fungsi untuk menyimpan data karyawan
 */
function handleSaveEmployee(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEETS.EMPLOYEES);
    
    // Cek apakah email sudah ada
    const existingData = getEmployeesData();
    const existingIndex = existingData.findIndex(emp => emp.email === data.email);
    
    const rowData = [
      data.nrp,
      data.nama,
      data.email,
      data.statusPernikahan,
      data.jabatan,
      data.under,
      data.statusKaryawan,
      data.role
    ];
    
    if (existingIndex >= 0) {
      // Update existing employee
      const rowNumber = existingIndex + 2; // +2 karena header dan index dimulai dari 0
      sheet.getRange(rowNumber, 1, 1, rowData.length).setValues([rowData]);
    } else {
      // Add new employee
      sheet.appendRow(rowData);
    }
    
    return createResponse(true, 'Data karyawan berhasil disimpan');
  } catch (error) {
    console.error('Error in handleSaveEmployee:', error);
    return createResponse(false, 'Terjadi kesalahan saat menyimpan data karyawan');
  }
}

/**
 * Fungsi untuk menyimpan data absensi
 */
function handleSaveAttendance(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEETS.ATTENDANCE);
    
    const rowData = [
      new Date().toISOString(), // ID (timestamp)
      data.tanggal,
      data.email,
      data.nama,
      data.status,
      data.shift || '',
      data.keterangan || ''
    ];
    
    sheet.appendRow(rowData);
    
    return createResponse(true, 'Data absensi berhasil disimpan');
  } catch (error) {
    console.error('Error in handleSaveAttendance:', error);
    return createResponse(false, 'Terjadi kesalahan saat menyimpan data absensi');
  }
}

/**
 * Fungsi untuk menyimpan laporan K3
 */
function handleSaveK3Report(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEETS.K3_REPORTS);
    
    const rowData = [
      new Date().toISOString(), // ID (timestamp)
      data.tanggal,
      data.email,
      data.pelapor,
      data.uraian,
      data.foto || '',
      data.status || 'Belum'
    ];
    
    sheet.appendRow(rowData);
    
    return createResponse(true, 'Laporan K3 berhasil disimpan');
  } catch (error) {
    console.error('Error in handleSaveK3Report:', error);
    return createResponse(false, 'Terjadi kesalahan saat menyimpan laporan K3');
  }
}

/**
 * Fungsi untuk menyimpan permohonan MCU
 */
function handleSaveMcuRequest(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEETS.MCU_REQUESTS);
    
    const rowData = [
      new Date().toISOString(), // ID (timestamp)
      data.tanggal,
      data.email,
      data.pemohon,
      data.alasan,
      data.tanggalRencana,
      data.status || 'Pending'
    ];
    
    sheet.appendRow(rowData);
    
    return createResponse(true, 'Permohonan MCU berhasil disimpan');
  } catch (error) {
    console.error('Error in handleSaveMcuRequest:', error);
    return createResponse(false, 'Terjadi kesalahan saat menyimpan permohonan MCU');
  }
}

/**
 * Fungsi untuk menyimpan permintaan APD
 */
function handleSaveApdRequest(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEETS.APD_REQUESTS);
    
    const rowData = [
      new Date().toISOString(), // ID (timestamp)
      data.tanggal,
      data.email,
      data.pemohon,
      data.nomorSepatu,
      data.nomorBaju,
      data.nomorCelana,
      data.kacamata,
      data.warnaHelm,
      data.status || 'Pending'
    ];
    
    sheet.appendRow(rowData);
    
    return createResponse(true, 'Permintaan APD berhasil disimpan');
  } catch (error) {
    console.error('Error in handleSaveApdRequest:', error);
    return createResponse(false, 'Terjadi kesalahan saat menyimpan permintaan APD');
  }
}

/**
 * Fungsi untuk mengupdate status K3
 */
function handleUpdateK3Status(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEETS.K3_REPORTS);
    
    const reports = getK3ReportsData();
    const reportIndex = reports.findIndex(report => report.id === data.id);
    
    if (reportIndex >= 0) {
      const rowNumber = reportIndex + 2; // +2 karena header dan index dimulai dari 0
      sheet.getRange(rowNumber, 7).setValue(data.status); // Kolom status
      return createResponse(true, 'Status K3 berhasil diupdate');
    } else {
      return createResponse(false, 'Laporan K3 tidak ditemukan');
    }
  } catch (error) {
    console.error('Error in handleUpdateK3Status:', error);
    return createResponse(false, 'Terjadi kesalahan saat mengupdate status K3');
  }
}

/**
 * Fungsi untuk mengupdate status MCU
 */
function handleUpdateMcuStatus(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEETS.MCU_REQUESTS);
    
    const requests = getMcuRequestsData();
    const requestIndex = requests.findIndex(req => req.id === data.id);
    
    if (requestIndex >= 0) {
      const rowNumber = requestIndex + 2; // +2 karena header dan index dimulai dari 0
      sheet.getRange(rowNumber, 7).setValue(data.status); // Kolom status
      return createResponse(true, 'Status MCU berhasil diupdate');
    } else {
      return createResponse(false, 'Permohonan MCU tidak ditemukan');
    }
  } catch (error) {
    console.error('Error in handleUpdateMcuStatus:', error);
    return createResponse(false, 'Terjadi kesalahan saat mengupdate status MCU');
  }
}

/**
 * Fungsi untuk mengupdate status APD
 */
function handleUpdateApdStatus(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEETS.APD_REQUESTS);
    
    const requests = getApdRequestsData();
    const requestIndex = requests.findIndex(req => req.id === data.id);
    
    if (requestIndex >= 0) {
      const rowNumber = requestIndex + 2; // +2 karena header dan index dimulai dari 0
      sheet.getRange(rowNumber, 10).setValue(data.status); // Kolom status
      return createResponse(true, 'Status APD berhasil diupdate');
    } else {
      return createResponse(false, 'Permintaan APD tidak ditemukan');
    }
  } catch (error) {
    console.error('Error in handleUpdateApdStatus:', error);
    return createResponse(false, 'Terjadi kesalahan saat mengupdate status APD');
  }
}

/**
 * Fungsi untuk menghapus karyawan
 */
function handleDeleteEmployee(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEETS.EMPLOYEES);
    
    const employees = getEmployeesData();
    const employeeIndex = employees.findIndex(emp => emp.email === data.email);
    
    if (employeeIndex >= 0) {
      const rowNumber = employeeIndex + 2; // +2 karena header dan index dimulai dari 0
      sheet.deleteRow(rowNumber);
      return createResponse(true, 'Data karyawan berhasil dihapus');
    } else {
      return createResponse(false, 'Data karyawan tidak ditemukan');
    }
  } catch (error) {
    console.error('Error in handleDeleteEmployee:', error);
    return createResponse(false, 'Terjadi kesalahan saat menghapus data karyawan');
  }
}

/**
 * Fungsi untuk menghapus absensi
 */
function handleDeleteAttendance(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEETS.ATTENDANCE);
    
    const attendance = getAttendanceData();
    const attendanceIndex = attendance.findIndex(att => att.id === data.id);
    
    if (attendanceIndex >= 0) {
      const rowNumber = attendanceIndex + 2; // +2 karena header dan index dimulai dari 0
      sheet.deleteRow(rowNumber);
      return createResponse(true, 'Data absensi berhasil dihapus');
    } else {
      return createResponse(false, 'Data absensi tidak ditemukan');
    }
  } catch (error) {
    console.error('Error in handleDeleteAttendance:', error);
    return createResponse(false, 'Terjadi kesalahan saat menghapus data absensi');
  }
}

// Helper Functions

/**
 * Fungsi untuk membuat response JSON
 */
function createResponse(success, message, data = null) {
  const response = {
    success: success,
    message: message
  };
  
  if (data) {
    response.data = data;
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Fungsi untuk mendapatkan data karyawan dari sheet
 */
function getEmployeesData() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEETS.EMPLOYEES);
  const data = sheet.getDataRange().getValues();
  
  // Skip header row
  const employees = data.slice(1).map(row => ({
    nrp: row[0],
    nama: row[1],
    email: row[2],
    statusPernikahan: row[3],
    jabatan: row[4],
    under: row[5],
    statusKaryawan: row[6],
    role: row[7]
  }));
  
  return employees;
}

/**
 * Fungsi untuk mendapatkan data absensi dari sheet
 */
function getAttendanceData() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEETS.ATTENDANCE);
  const data = sheet.getDataRange().getValues();
  
  // Skip header row
  const attendance = data.slice(1).map(row => ({
    id: row[0],
    tanggal: row[1],
    email: row[2],
    nama: row[3],
    status: row[4],
    shift: row[5],
    keterangan: row[6]
  }));
  
  return attendance;
}

/**
 * Fungsi untuk mendapatkan data laporan K3 dari sheet
 */
function getK3ReportsData() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEETS.K3_REPORTS);
  const data = sheet.getDataRange().getValues();
  
  // Skip header row
  const reports = data.slice(1).map(row => ({
    id: row[0],
    tanggal: row[1],
    email: row[2],
    pelapor: row[3],
    uraian: row[4],
    foto: row[5],
    status: row[6]
  }));
  
  return reports;
}

/**
 * Fungsi untuk mendapatkan data permohonan MCU dari sheet
 */
function getMcuRequestsData() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEETS.MCU_REQUESTS);
  const data = sheet.getDataRange().getValues();
  
  // Skip header row
  const requests = data.slice(1).map(row => ({
    id: row[0],
    tanggal: row[1],
    email: row[2],
    pemohon: row[3],
    alasan: row[4],
    tanggalRencana: row[5],
    status: row[6]
  }));
  
  return requests;
}

/**
 * Fungsi untuk mendapatkan data permintaan APD dari sheet
 */
function getApdRequestsData() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEETS.APD_REQUESTS);
  const data = sheet.getDataRange().getValues();
  
  // Skip header row
  const requests = data.slice(1).map(row => ({
    id: row[0],
    tanggal: row[1],
    email: row[2],
    pemohon: row[3],
    nomorSepatu: row[4],
    nomorBaju: row[5],
    nomorCelana: row[6],
    kacamata: row[7],
    warnaHelm: row[8],
    status: row[9]
  }));
  
  return requests;
}

/**
 * Fungsi untuk setup spreadsheet (jalankan sekali untuk membuat struktur)
 */
function setupSpreadsheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  // Setup DataKaryawan sheet
  let sheet = spreadsheet.getSheetByName(SHEETS.EMPLOYEES);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEETS.EMPLOYEES);
    sheet.getRange(1, 1, 1, 8).setValues([['NRP', 'NAMA', 'EMAIL', 'STATUS PERNIKAHAN', 'JABATAN', 'UNDER', 'STATUS KARYAWAN', 'ROLE']]);
  }
  
  // Setup Absensi sheet
  sheet = spreadsheet.getSheetByName(SHEETS.ATTENDANCE);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEETS.ATTENDANCE);
    sheet.getRange(1, 1, 1, 7).setValues([['ID', 'TANGGAL', 'EMAIL', 'NAMA', 'STATUS', 'SHIFT', 'KETERANGAN']]);
  }
  
  // Setup LaporanK3 sheet
  sheet = spreadsheet.getSheetByName(SHEETS.K3_REPORTS);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEETS.K3_REPORTS);
    sheet.getRange(1, 1, 1, 7).setValues([['ID', 'TANGGAL', 'EMAIL', 'PELAPOR', 'URAIAN', 'FOTO', 'STATUS']]);
  }
  
  // Setup PermohonanMCU sheet
  sheet = spreadsheet.getSheetByName(SHEETS.MCU_REQUESTS);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEETS.MCU_REQUESTS);
    sheet.getRange(1, 1, 1, 7).setValues([['ID', 'TANGGAL', 'EMAIL', 'PEMOHON', 'ALASAN', 'TANGGAL RENCANA', 'STATUS']]);
  }
  
  // Setup PermintaanAPD sheet
  sheet = spreadsheet.getSheetByName(SHEETS.APD_REQUESTS);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEETS.APD_REQUESTS);
    sheet.getRange(1, 1, 1, 10).setValues([['ID', 'TANGGAL', 'EMAIL', 'PEMOHON', 'NOMOR SEPATU', 'NOMOR BAJU', 'NOMOR CELANA', 'KACAMATA', 'WARNA HELM', 'STATUS']]);
  }
  
  // Add sample data
  addSampleData();
}

/**
 * Fungsi untuk menambahkan data sample
 */
function addSampleData() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEETS.EMPLOYEES);
  
  // Add sample employees
  const sampleEmployees = [
    ['EMP001', 'John Doe', 'john.doe@company.com', 'Menikah', 'Manager', 'HR', 'Aktif', 'admin'],
    ['EMP002', 'Jane Smith', 'jane.smith@company.com', 'Lajang', 'Staff', 'IT', 'Aktif', 'karyawan'],
    ['EMP003', 'Bob Johnson', 'bob.johnson@company.com', 'Menikah', 'Supervisor', 'Production', 'Aktif', 'karyawan']
  ];
  
  sampleEmployees.forEach(employee => {
    sheet.appendRow(employee);
  });
}
