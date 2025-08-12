// Module loading functions for HRIS System

// Load Dashboard Module
function loadDashboard() {
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h5><i class="fas fa-tachometer-alt"></i> Dashboard</h5>
            </div>
            <div class="card-body">
                <div class="dashboard-stats">
                    <div class="stat-card">
                        <div class="stat-number" id="totalEmployees">-</div>
                        <div class="stat-label">Total Karyawan</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" id="presentToday">-</div>
                        <div class="stat-label">Hadir Hari Ini</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" id="pendingRequests">-</div>
                        <div class="stat-label">Permintaan Pending</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" id="k3Reports">-</div>
                        <div class="stat-label">Laporan K3</div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h6>Absensi Hari Ini</h6>
                            </div>
                            <div class="card-body">
                                <div id="todayAttendance">Memuat data...</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h6>Permintaan Terbaru</h6>
                            </div>
                            <div class="card-body">
                                <div id="recentRequests">Memuat data...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Load dashboard data
    loadDashboardData();
}

// Load Employees Module
function loadEmployees() {
    const contentArea = document.getElementById('contentArea');
    const isAdmin = currentUser && currentUser.role === 'admin';
    
    contentArea.innerHTML = `
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5><i class="fas fa-users"></i> Data Karyawan</h5>
                ${isAdmin ? '<button class="btn btn-primary btn-sm" onclick="showEmployeeModal()"><i class="fas fa-plus"></i> Tambah Karyawan</button>' : ''}
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>NRP</th>
                                <th>Nama</th>
                                <th>Email</th>
                                <th>Status Pernikahan</th>
                                <th>Jabatan</th>
                                <th>Under</th>
                                <th>Status Karyawan</th>
                                <th>Role</th>
                                ${isAdmin ? '<th>Aksi</th>' : ''}
                            </tr>
                        </thead>
                        <tbody id="employeesTableBody">
                            <tr><td colspan="${isAdmin ? 10 : 9}" class="text-center">Memuat data...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    // Load employees data
    loadEmployeesData();
}

// Load Attendance Module
function loadAttendance() {
    const contentArea = document.getElementById('contentArea');
    const isAdmin = currentUser && currentUser.role === 'admin';
    
    contentArea.innerHTML = `
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5><i class="fas fa-clock"></i> Absensi</h5>
                <button class="btn btn-primary btn-sm" onclick="showAttendanceModal()"><i class="fas fa-plus"></i> Input Absensi</button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Tanggal</th>
                                <th>Nama</th>
                                <th>Status</th>
                                <th>Shift</th>
                                <th>Keterangan</th>
                                ${isAdmin ? '<th>Aksi</th>' : ''}
                            </tr>
                        </thead>
                        <tbody id="attendanceTableBody">
                            <tr><td colspan="${isAdmin ? 7 : 6}" class="text-center">Memuat data...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    // Load attendance data
    loadAttendanceData();
}

// Load K3 Reports Module
function loadK3Reports() {
    const contentArea = document.getElementById('contentArea');
    const isAdmin = currentUser && currentUser.role === 'admin';
    
    contentArea.innerHTML = `
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5><i class="fas fa-exclamation-triangle"></i> Laporan K3</h5>
                <button class="btn btn-primary btn-sm" onclick="showK3Modal()"><i class="fas fa-plus"></i> Buat Laporan</button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Tanggal</th>
                                <th>Nama Pelapor</th>
                                <th>Uraian</th>
                                <th>Status</th>
                                ${isAdmin ? '<th>Aksi</th>' : ''}
                            </tr>
                        </thead>
                        <tbody id="k3TableBody">
                            <tr><td colspan="${isAdmin ? 6 : 5}" class="text-center">Memuat data...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    // Load K3 reports data
    loadK3Data();
}

// Load MCU Requests Module
function loadMcuRequests() {
    const contentArea = document.getElementById('contentArea');
    const isAdmin = currentUser && currentUser.role === 'admin';
    
    contentArea.innerHTML = `
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5><i class="fas fa-stethoscope"></i> Permohonan MCU</h5>
                <button class="btn btn-primary btn-sm" onclick="showMcuModal()"><i class="fas fa-plus"></i> Buat Permohonan</button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Tanggal</th>
                                <th>Nama Pemohon</th>
                                <th>Alasan</th>
                                <th>Tanggal Rencana</th>
                                <th>Status</th>
                                ${isAdmin ? '<th>Aksi</th>' : ''}
                            </tr>
                        </thead>
                        <tbody id="mcuTableBody">
                            <tr><td colspan="${isAdmin ? 7 : 6}" class="text-center">Memuat data...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    // Load MCU requests data
    loadMcuData();
}

// Load APD Requests Module
function loadApdRequests() {
    const contentArea = document.getElementById('contentArea');
    const isAdmin = currentUser && currentUser.role === 'admin';
    
    contentArea.innerHTML = `
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5><i class="fas fa-hard-hat"></i> Permintaan APD</h5>
                <button class="btn btn-primary btn-sm" onclick="showApdModal()"><i class="fas fa-plus"></i> Buat Permintaan</button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Tanggal</th>
                                <th>Nama Pemohon</th>
                                <th>Sepatu</th>
                                <th>Baju</th>
                                <th>Celana</th>
                                <th>Kacamata</th>
                                <th>Helm</th>
                                <th>Status</th>
                                ${isAdmin ? '<th>Aksi</th>' : ''}
                            </tr>
                        </thead>
                        <tbody id="apdTableBody">
                            <tr><td colspan="${isAdmin ? 10 : 9}" class="text-center">Memuat data...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    // Load APD requests data
    loadApdData();
}

// Load Reports Module
function loadReports() {
    const contentArea = document.getElementById('contentArea');
    
    contentArea.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h5><i class="fas fa-chart-bar"></i> Laporan</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h6>Laporan Absensi Bulanan</h6>
                            </div>
                            <div class="card-body">
                                <div class="mb-3">
                                    <label for="reportMonth" class="form-label">Pilih Bulan</label>
                                    <input type="month" class="form-control" id="reportMonth">
                                </div>
                                <button class="btn btn-primary" onclick="generateAttendanceReport()">Generate Laporan</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h6>Statistik</h6>
                            </div>
                            <div class="card-body">
                                <div id="statisticsReport">Pilih bulan untuk melihat statistik</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="reportResult"></div>
            </div>
        </div>
    `;
}
