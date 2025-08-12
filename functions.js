// Functions for HRIS System

// Data Loading Functions
function loadDashboardData() {
    fetch(`${CONFIG.SCRIPT_URL}?action=getDashboardData`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('totalEmployees').textContent = data.totalEmployees || 0;
                document.getElementById('presentToday').textContent = data.presentToday || 0;
                document.getElementById('pendingRequests').textContent = data.pendingRequests || 0;
                document.getElementById('k3Reports').textContent = data.k3Reports || 0;
                
                loadTodayAttendance();
                loadRecentRequests();
            }
        })
        .catch(error => {
            console.error('Error loading dashboard data:', error);
            showAlert('Gagal memuat data dashboard', 'error');
        });
}

function loadEmployeesData() {
    fetch(`${CONFIG.SCRIPT_URL}?action=getEmployees`)
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
    const params = currentUser.role === 'admin' ? '' : `&email=${currentUser.email}`;
    fetch(`${CONFIG.SCRIPT_URL}?action=getAttendance${params}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                renderAttendanceTable(data.attendance);
            } else {
                document.getElementById('attendanceTableBody').innerHTML = 
                    '<tr><td colspan="7" class="text-center text-danger">Gagal memuat data absensi</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error loading attendance:', error);
            document.getElementById('attendanceTableBody').innerHTML = 
                '<tr><td colspan="7" class="text-center text-danger">Terjadi kesalahan saat memuat data</td></tr>';
        });
}

function loadK3Data() {
    const params = currentUser.role === 'admin' ? '' : `&email=${currentUser.email}`;
    fetch(`${CONFIG.SCRIPT_URL}?action=getK3Reports${params}`)
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
    const params = currentUser.role === 'admin' ? '' : `&email=${currentUser.email}`;
    fetch(`${CONFIG.SCRIPT_URL}?action=getMcuRequests${params}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                renderMcuTable(data.requests);
            } else {
                document.getElementById('mcuTableBody').innerHTML = 
                    '<tr><td colspan="7" class="text-center text-danger">Gagal memuat data permohonan MCU</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error loading MCU requests:', error);
            document.getElementById('mcuTableBody').innerHTML = 
                '<tr><td colspan="7" class="text-center text-danger">Terjadi kesalahan saat memuat data</td></tr>';
        });
}

function loadApdData() {
    const params = currentUser.role === 'admin' ? '' : `&email=${currentUser.email}`;
    fetch(`${CONFIG.SCRIPT_URL}?action=getApdRequests${params}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                renderApdTable(data.requests);
            } else {
                document.getElementById('apdTableBody').innerHTML = 
                    '<tr><td colspan="10" class="text-center text-danger">Gagal memuat data permintaan APD</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error loading APD requests:', error);
            document.getElementById('apdTableBody').innerHTML = 
                '<tr><td colspan="10" class="text-center text-danger">Terjadi kesalahan saat memuat data</td></tr>';
        });
}

// Table Rendering Functions
function renderEmployeesTable(employees) {
    const tbody = document.getElementById('employeesTableBody');
    if (!employees || employees.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" class="text-center">Tidak ada data karyawan</td></tr>';
        return;
    }
    
    const isAdmin = currentUser.role === 'admin';
    tbody.innerHTML = employees.map((emp, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${emp.nrp || '-'}</td>
            <td>${emp.nama || '-'}</td>
            <td>${emp.email || '-'}</td>
            <td>${emp.statusPernikahan || '-'}</td>
            <td>${emp.jabatan || '-'}</td>
            <td>${emp.under || '-'}</td>
            <td><span class="status-badge ${emp.statusKaryawan === 'Aktif' ? 'status-approved' : 'status-rejected'}">${emp.statusKaryawan || '-'}</span></td>
            <td>${emp.role || '-'}</td>
            ${isAdmin ? `
                <td>
                    <div class="btn-group">
                        <button class="btn btn-sm btn-warning" onclick="editEmployee('${emp.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteEmployee('${emp.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            ` : ''}
        </tr>
    `).join('');
}

function renderAttendanceTable(attendance) {
    const tbody = document.getElementById('attendanceTableBody');
    if (!attendance || attendance.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">Tidak ada data absensi</td></tr>';
        return;
    }
    
    const isAdmin = currentUser.role === 'admin';
    tbody.innerHTML = attendance.map((att, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${formatDate(att.tanggal)}</td>
            <td>${att.nama || '-'}</td>
            <td><span class="status-badge ${getStatusBadgeClass(att.status)}">${att.status || '-'}</span></td>
            <td>${att.shift || '-'}</td>
            <td>${att.keterangan || '-'}</td>
            ${isAdmin ? `
                <td>
                    <div class="btn-group">
                        <button class="btn btn-sm btn-warning" onclick="editAttendance('${att.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteAttendance('${att.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            ` : ''}
        </tr>
    `).join('');
}

function renderK3Table(reports) {
    const tbody = document.getElementById('k3TableBody');
    if (!reports || reports.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">Tidak ada data laporan K3</td></tr>';
        return;
    }
    
    const isAdmin = currentUser.role === 'admin';
    tbody.innerHTML = reports.map((report, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${formatDate(report.tanggal)}</td>
            <td>${report.namaPelapor || '-'}</td>
            <td>${report.uraian || '-'}</td>
            <td><span class="status-badge ${report.status === 'Selesai' ? 'status-approved' : 'status-pending'}">${report.status || 'Belum'}</span></td>
            ${isAdmin ? `
                <td>
                    <div class="btn-group">
                        <button class="btn btn-sm btn-success" onclick="updateK3Status('${report.id}', 'Selesai')">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn btn-sm btn-warning" onclick="editK3Report('${report.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </td>
            ` : ''}
        </tr>
    `).join('');
}

function renderMcuTable(requests) {
    const tbody = document.getElementById('mcuTableBody');
    if (!requests || requests.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">Tidak ada data permohonan MCU</td></tr>';
        return;
    }
    
    const isAdmin = currentUser.role === 'admin';
    tbody.innerHTML = requests.map((req, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${formatDate(req.tanggalPermohonan)}</td>
            <td>${req.namaPemohon || '-'}</td>
            <td>${req.alasan || '-'}</td>
            <td>${formatDate(req.tanggalRencana)}</td>
            <td><span class="status-badge ${getRequestStatusBadgeClass(req.status)}">${req.status || 'Pending'}</span></td>
            ${isAdmin ? `
                <td>
                    <div class="btn-group">
                        <button class="btn btn-sm btn-success" onclick="updateMcuStatus('${req.id}', 'Disetujui')">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="updateMcuStatus('${req.id}', 'Ditolak')">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </td>
            ` : ''}
        </tr>
    `).join('');
}

function renderApdTable(requests) {
    const tbody = document.getElementById('apdTableBody');
    if (!requests || requests.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" class="text-center">Tidak ada data permintaan APD</td></tr>';
        return;
    }
    
    const isAdmin = currentUser.role === 'admin';
    tbody.innerHTML = requests.map((req, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${formatDate(req.tanggalPermintaan)}</td>
            <td>${req.namaPemohon || '-'}</td>
            <td>${req.nomorSepatu || '-'}</td>
            <td>${req.nomorBaju || '-'}</td>
            <td>${req.nomorCelana || '-'}</td>
            <td>${req.kacamata || '-'}</td>
            <td>${req.warnaHelm || '-'}</td>
            <td><span class="status-badge ${getRequestStatusBadgeClass(req.status)}">${req.status || 'Pending'}</span></td>
            ${isAdmin ? `
                <td>
                    <div class="btn-group">
                        <button class="btn btn-sm btn-success" onclick="updateApdStatus('${req.id}', 'Disetujui')">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="updateApdStatus('${req.id}', 'Ditolak')">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </td>
            ` : ''}
        </tr>
    `).join('');
}

// Modal Functions
function showEmployeeModal(employeeId = null) {
    const modal = new bootstrap.Modal(document.getElementById('employeeModal'));
    const title = document.querySelector('#employeeModal .modal-title');
    const form = document.getElementById('employeeForm');
    
    if (employeeId) {
        title.textContent = 'Edit Karyawan';
        // Load employee data for editing
        loadEmployeeData(employeeId);
    } else {
        title.textContent = 'Tambah Karyawan';
        form.reset();
    }
    
    modal.show();
}

function showAttendanceModal(attendanceId = null) {
    const modal = new bootstrap.Modal(document.getElementById('attendanceModal'));
    const form = document.getElementById('attendanceForm');
    
    if (attendanceId) {
        // Load attendance data for editing
        loadAttendanceData(attendanceId);
    } else {
        form.reset();
        document.getElementById('attendanceDate').value = new Date().toISOString().split('T')[0];
    }
    
    modal.show();
}

function showK3Modal(reportId = null) {
    const modal = new bootstrap.Modal(document.getElementById('k3Modal'));
    const form = document.getElementById('k3Form');
    
    if (reportId) {
        // Load K3 report data for editing
        loadK3Data(reportId);
    } else {
        form.reset();
        document.getElementById('k3Date').value = new Date().toISOString().split('T')[0];
    }
    
    modal.show();
}

function showMcuModal(requestId = null) {
    const modal = new bootstrap.Modal(document.getElementById('mcuModal'));
    const form = document.getElementById('mcuForm');
    
    if (requestId) {
        // Load MCU request data for editing
        loadMcuData(requestId);
    } else {
        form.reset();
        document.getElementById('mcuRequestDate').value = new Date().toISOString().split('T')[0];
    }
    
    modal.show();
}

function showApdModal(requestId = null) {
    const modal = new bootstrap.Modal(document.getElementById('apdModal'));
    const form = document.getElementById('apdForm');
    
    if (requestId) {
        // Load APD request data for editing
        loadApdData(requestId);
    } else {
        form.reset();
        document.getElementById('apdDate').value = new Date().toISOString().split('T')[0];
    }
    
    modal.show();
}

// Form Handling Functions
function handleAttendanceStatusChange() {
    const status = document.getElementById('attendanceStatus').value;
    const cutiGroup = document.getElementById('cutiDateGroup');
    
    if (status === 'Cuti') {
        cutiGroup.style.display = 'block';
    } else {
        cutiGroup.style.display = 'none';
    }
}

// Save Functions
function saveEmployee() {
    const form = document.getElementById('employeeForm');
    const formData = new FormData(form);
    
    const data = {
        action: 'saveEmployee',
        nrp: formData.get('nrp'),
        nama: formData.get('nama'),
        email: formData.get('email'),
        statusPernikahan: formData.get('statusPernikahan'),
        jabatan: formData.get('jabatan'),
        under: formData.get('under'),
        statusKaryawan: formData.get('statusKaryawan'),
        role: formData.get('role')
    };
    
    fetch(CONFIG.SCRIPT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            showAlert('Data karyawan berhasil disimpan', 'success');
            bootstrap.Modal.getInstance(document.getElementById('employeeModal')).hide();
            loadEmployeesData();
        } else {
            showAlert(result.message || 'Gagal menyimpan data', 'error');
        }
    })
    .catch(error => {
        console.error('Error saving employee:', error);
        showAlert('Terjadi kesalahan saat menyimpan data', 'error');
    });
}

// Utility Functions
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID');
}

function getStatusBadgeClass(status) {
    switch (status) {
        case 'Hadir Masuk':
        case 'Hadir Pulang':
            return 'status-approved';
        case 'Sakit':
        case 'Cuti':
            return 'status-pending';
        case 'Alfa':
            return 'status-rejected';
        default:
            return 'status-pending';
    }
}

function getRequestStatusBadgeClass(status) {
    switch (status) {
        case 'Disetujui':
            return 'status-approved';
        case 'Ditolak':
            return 'status-rejected';
        default:
            return 'status-pending';
    }
}

function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.content-area');
    container.insertBefore(alertDiv, container.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Attendance status change handler
    const attendanceStatus = document.getElementById('attendanceStatus');
    if (attendanceStatus) {
        attendanceStatus.addEventListener('change', handleAttendanceStatusChange);
    }
    
    // Save button handlers
    const saveEmployeeBtn = document.getElementById('saveEmployeeBtn');
    if (saveEmployeeBtn) {
        saveEmployeeBtn.addEventListener('click', saveEmployee);
    }
    
    const saveAttendanceBtn = document.getElementById('saveAttendanceBtn');
    if (saveAttendanceBtn) {
        saveAttendanceBtn.addEventListener('click', saveAttendance);
    }
    
    const saveK3Btn = document.getElementById('saveK3Btn');
    if (saveK3Btn) {
        saveK3Btn.addEventListener('click', saveK3Report);
    }
    
    const saveMcuBtn = document.getElementById('saveMcuBtn');
    if (saveMcuBtn) {
        saveMcuBtn.addEventListener('click', saveMcuRequest);
    }
    
    const saveApdBtn = document.getElementById('saveApdBtn');
    if (saveApdBtn) {
        saveApdBtn.addEventListener('click', saveApdRequest);
    }
});

// Placeholder functions for admin operations
function editEmployee(id) {
    showEmployeeModal(id);
}

function deleteEmployee(id) {
    if (confirm('Apakah Anda yakin ingin menghapus karyawan ini?')) {
        // Implementation for deleting employee
        console.log('Delete employee:', id);
    }
}

function editAttendance(id) {
    showAttendanceModal(id);
}

function deleteAttendance(id) {
    if (confirm('Apakah Anda yakin ingin menghapus data absensi ini?')) {
        // Implementation for deleting attendance
        console.log('Delete attendance:', id);
    }
}

function updateK3Status(id, status) {
    // Implementation for updating K3 status
    console.log('Update K3 status:', id, status);
}

function editK3Report(id) {
    showK3Modal(id);
}

function updateMcuStatus(id, status) {
    // Implementation for updating MCU status
    console.log('Update MCU status:', id, status);
}

function updateApdStatus(id, status) {
    // Implementation for updating APD status
    console.log('Update APD status:', id, status);
}

function loadTodayAttendance() {
    // Implementation for loading today's attendance
    document.getElementById('todayAttendance').innerHTML = '<p class="text-muted">Memuat data absensi hari ini...</p>';
}

function loadRecentRequests() {
    // Implementation for loading recent requests
    document.getElementById('recentRequests').innerHTML = '<p class="text-muted">Memuat permintaan terbaru...</p>';
}

function generateAttendanceReport() {
    // Implementation for generating attendance report
    console.log('Generate attendance report');
}

// Additional placeholder functions
function saveAttendance() {
    console.log('Save attendance');
}

function saveK3Report() {
    console.log('Save K3 report');
}

function saveMcuRequest() {
    console.log('Save MCU request');
}

function saveApdRequest() {
    console.log('Save APD request');
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('show');
}
