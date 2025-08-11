// Module Loading Functions
function loadModule(moduleName) {
    currentModule = moduleName;
    showLoading();
    
    switch(moduleName) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'employees':
            loadEmployees();
            break;
        case 'attendance':
            loadAttendance();
            break;
        case 'k3':
            loadK3Reports();
            break;
        case 'mcu':
            loadMcuRequests();
            break;
        case 'apd':
            loadApdRequests();
            break;
        case 'reports':
            loadReports();
            break;
        default:
            loadDashboard();
    }
}

function loadDashboard() {
    hideLoading();
    const content = `
        <div class="row">
            <div class="col-12">
                <h2 class="mb-4"><i class="fas fa-tachometer-alt me-2"></i>Dashboard</h2>
            </div>
        </div>
        <div class="row mb-4">
            <div class="col-md-3 mb-3">
                <div class="stats-card">
                    <div class="number" id="totalEmployees">-</div>
                    <div class="label">Total Karyawan</div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="stats-card">
                    <div class="number" id="presentToday">-</div>
                    <div class="label">Hadir Hari Ini</div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="stats-card">
                    <div class="number" id="pendingRequests">-</div>
                    <div class="label">Permintaan Pending</div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="stats-card">
                    <div class="number" id="k3Reports">-</div>
                    <div class="label">Laporan K3</div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 mb-4">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0"><i class="fas fa-clock me-2"></i>Absensi Hari Ini</h5>
                    </div>
                    <div class="card-body">
                        <div id="todayAttendance" class="table-responsive">
                            <p class="text-center text-muted">Memuat data...</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-4">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0"><i class="fas fa-bell me-2"></i>Notifikasi Terbaru</h5>
                    </div>
                    <div class="card-body">
                        <div id="notifications">
                            <p class="text-center text-muted">Memuat notifikasi...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('contentArea').innerHTML = content;
    loadDashboardData();
}

function loadEmployees() {
    hideLoading();
    const content = `
        <div class="row">
            <div class="col-12">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2><i class="fas fa-users me-2"></i>Data Karyawan</h2>
                    ${currentRole === 'admin' ? '<button class="btn btn-primary" onclick="showEmployeeModal()"><i class="fas fa-plus me-2"></i>Tambah Karyawan</button>' : ''}
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover" id="employeesTable">
                                <thead>
                                    <tr>
                                        <th>NO</th>
                                        <th>NRP</th>
                                        <th>NAMA</th>
                                        <th>EMAIL</th>
                                        <th>STATUS PERNIKAHAN</th>
                                        <th>JABATAN</th>
                                        <th>UNDER</th>
                                        <th>STATUS KARYAWAN</th>
                                        <th>ROLE</th>
                                        ${currentRole === 'admin' ? '<th>AKSI</th>' : ''}
                                    </tr>
                                </thead>
                                <tbody id="employeesTableBody">
                                    <tr>
                                        <td colspan="10" class="text-center">Memuat data...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('contentArea').innerHTML = content;
    loadEmployeesData();
}

function loadAttendance() {
    hideLoading();
    const content = `
        <div class="row">
            <div class="col-12">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2><i class="fas fa-clock me-2"></i>Absensi</h2>
                    <button class="btn btn-primary" onclick="showAttendanceModal()"><i class="fas fa-plus me-2"></i>Input Absensi</button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover" id="attendanceTable">
                                <thead>
                                    <tr>
                                        <th>TANGGAL</th>
                                        <th>NAMA</th>
                                        <th>STATUS</th>
                                        <th>SHIFT</th>
                                        <th>KETERANGAN</th>
                                        ${currentRole === 'admin' ? '<th>AKSI</th>' : ''}
                                    </tr>
                                </thead>
                                <tbody id="attendanceTableBody">
                                    <tr>
                                        <td colspan="6" class="text-center">Memuat data...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('contentArea').innerHTML = content;
    loadAttendanceData();
}

function loadK3Reports() {
    hideLoading();
    const content = `
        <div class="row">
            <div class="col-12">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2><i class="fas fa-exclamation-triangle me-2"></i>Laporan K3</h2>
                    <button class="btn btn-primary" onclick="showK3Modal()"><i class="fas fa-plus me-2"></i>Buat Laporan</button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover" id="k3Table">
                                <thead>
                                    <tr>
                                        <th>TANGGAL</th>
                                        <th>PELAPOR</th>
                                        <th>URAIAN</th>
                                        <th>FOTO</th>
                                        <th>STATUS</th>
                                        ${currentRole === 'admin' ? '<th>AKSI</th>' : ''}
                                    </tr>
                                </thead>
                                <tbody id="k3TableBody">
                                    <tr>
                                        <td colspan="6" class="text-center">Memuat data...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('contentArea').innerHTML = content;
    loadK3Data();
}

function loadMcuRequests() {
    hideLoading();
    const content = `
        <div class="row">
            <div class="col-12">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2><i class="fas fa-stethoscope me-2"></i>Permohonan MCU</h2>
                    <button class="btn btn-primary" onclick="showMcuModal()"><i class="fas fa-plus me-2"></i>Ajukan MCU</button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover" id="mcuTable">
                                <thead>
                                    <tr>
                                        <th>TANGGAL</th>
                                        <th>PEMOHON</th>
                                        <th>ALASAN</th>
                                        <th>TANGGAL RENCANA</th>
                                        <th>STATUS</th>
                                        ${currentRole === 'admin' ? '<th>AKSI</th>' : ''}
                                    </tr>
                                </thead>
                                <tbody id="mcuTableBody">
                                    <tr>
                                        <td colspan="6" class="text-center">Memuat data...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('contentArea').innerHTML = content;
    loadMcuData();
}

function loadApdRequests() {
    hideLoading();
    const content = `
        <div class="row">
            <div class="col-12">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2><i class="fas fa-hard-hat me-2"></i>Permintaan APD</h2>
                    <button class="btn btn-primary" onclick="showApdModal()"><i class="fas fa-plus me-2"></i>Ajukan APD</button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover" id="apdTable">
                                <thead>
                                    <tr>
                                        <th>TANGGAL</th>
                                        <th>PEMOHON</th>
                                        <th>SEPATU</th>
                                        <th>BAJU</th>
                                        <th>CELANA</th>
                                        <th>KACAMATA</th>
                                        <th>HELM</th>
                                        <th>STATUS</th>
                                        ${currentRole === 'admin' ? '<th>AKSI</th>' : ''}
                                    </tr>
                                </thead>
                                <tbody id="apdTableBody">
                                    <tr>
                                        <td colspan="9" class="text-center">Memuat data...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('contentArea').innerHTML = content;
    loadApdData();
}

function loadReports() {
    hideLoading();
    const content = `
        <div class="row">
            <div class="col-12">
                <h2 class="mb-4"><i class="fas fa-chart-bar me-2"></i>Laporan</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 mb-4">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0">Rekap Absensi Bulanan</h5>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <label for="reportMonth" class="form-label">Pilih Bulan</label>
                            <input type="month" class="form-control" id="reportMonth">
                        </div>
                        <button class="btn btn-primary" onclick="generateAttendanceReport()">
                            <i class="fas fa-download me-2"></i>Generate Laporan
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-4">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0">Statistik</h5>
                    </div>
                    <div class="card-body">
                        <div id="statistics">
                            <p class="text-center text-muted">Memuat statistik...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('contentArea').innerHTML = content;
    loadStatistics();
}

// Data Loading Functions
function loadDashboardData() {
    // Load dashboard statistics
    fetch(`${SCRIPT_URL}?action=getDashboardData`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('totalEmployees').textContent = data.totalEmployees || 0;
                document.getElementById('presentToday').textContent = data.presentToday || 0;
                document.getElementById('pendingRequests').textContent = data.pendingRequests || 0;
                document.getElementById('k3Reports').textContent = data.k3Reports || 0;
                
                loadTodayAttendance();
                loadNotifications();
            }
        })
        .catch(error => {
            console.error('Error loading dashboard data:', error);
        });
}

function loadEmployeesData() {
    fetch(`${SCRIPT_URL}?action=getEmployees`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                renderEmployeesTable(data.employees);
            } else {
                document.getElementById('employeesTableBody').innerHTML = 
                    '<tr><td colspan="10" class="text-center text-danger">Gagal memuat data karyawan</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error loading employees:', error);
            document.getElementById('employeesTableBody').innerHTML = 
                '<tr><td colspan="10" class="text-center text-danger">Terjadi kesalahan saat memuat data</td></tr>';
        });
}

function loadAttendanceData() {
    const params = currentRole === 'admin' ? '' : `&email=${currentUser.email}`;
    fetch(`${SCRIPT_URL}?action=getAttendance${params}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                renderAttendanceTable(data.attendance);
            } else {
                document.getElementById('attendanceTableBody').innerHTML = 
                    '<tr><td colspan="6" class="text-center text-danger">Gagal memuat data absensi</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error loading attendance:', error);
            document.getElementById('attendanceTableBody').innerHTML = 
                '<tr><td colspan="6" class="text-center text-danger">Terjadi kesalahan saat memuat data</td></tr>';
        });
}

function loadK3Data() {
    const params = currentRole === 'admin' ? '' : `&email=${currentUser.email}`;
    fetch(`${SCRIPT_URL}?action=getK3Reports${params}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                renderK3Table(data.reports);
            } else {
                document.getElementById('k3TableBody').innerHTML = 
                    '<tr><td colspan="6" class="text-center text-danger">Gagal memuat data laporan K3</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error loading K3 reports:', error);
            document.getElementById('k3TableBody').innerHTML = 
                '<tr><td colspan="6" class="text-center text-danger">Terjadi kesalahan saat memuat data</td></tr>';
        });
}

function loadMcuData() {
    const params = currentRole === 'admin' ? '' : `&email=${currentUser.email}`;
    fetch(`${SCRIPT_URL}?action=getMcuRequests${params}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                renderMcuTable(data.requests);
            } else {
                document.getElementById('mcuTableBody').innerHTML = 
                    '<tr><td colspan="6" class="text-center text-danger">Gagal memuat data permohonan MCU</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error loading MCU requests:', error);
            document.getElementById('mcuTableBody').innerHTML = 
                '<tr><td colspan="6" class="text-center text-danger">Terjadi kesalahan saat memuat data</td></tr>';
        });
}

function loadApdData() {
    const params = currentRole === 'admin' ? '' : `&email=${currentUser.email}`;
    fetch(`${SCRIPT_URL}?action=getApdRequests${params}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                renderApdTable(data.requests);
            } else {
                document.getElementById('apdTableBody').innerHTML = 
                    '<tr><td colspan="9" class="text-center text-danger">Gagal memuat data permintaan APD</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error loading APD requests:', error);
            document.getElementById('apdTableBody').innerHTML = 
                '<tr><td colspan="9" class="text-center text-danger">Terjadi kesalahan saat memuat data</td></tr>';
        });
}
