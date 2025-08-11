// Table Rendering Functions
function renderEmployeesTable(employees) {
    const tbody = document.getElementById('employeesTableBody');
    if (!employees || employees.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" class="text-center">Tidak ada data karyawan</td></tr>';
        return;
    }
    
    tbody.innerHTML = employees.map((emp, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${emp.nrp}</td>
            <td>${emp.nama}</td>
            <td>${emp.email}</td>
            <td>${emp.statusPernikahan}</td>
            <td>${emp.jabatan}</td>
            <td>${emp.under}</td>
            <td><span class="badge ${emp.statusKaryawan === 'Aktif' ? 'badge-success' : 'badge-danger'}">${emp.statusKaryawan}</span></td>
            <td><span class="badge ${emp.role === 'admin' ? 'badge-warning' : 'badge-info'}">${emp.role}</span></td>
            ${currentRole === 'admin' ? `
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="editEmployee('${emp.email}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteEmployee('${emp.email}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            ` : ''}
        </tr>
    `).join('');
}

function renderAttendanceTable(attendance) {
    const tbody = document.getElementById('attendanceTableBody');
    if (!attendance || attendance.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">Tidak ada data absensi</td></tr>';
        return;
    }
    
    tbody.innerHTML = attendance.map(att => `
        <tr>
            <td>${formatDate(att.tanggal)}</td>
            <td>${att.nama}</td>
            <td><span class="badge badge-info">${att.status}</span></td>
            <td>${att.shift || '-'}</td>
            <td>${att.keterangan || '-'}</td>
            ${currentRole === 'admin' ? `
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="editAttendance('${att.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteAttendance('${att.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
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
    
    tbody.innerHTML = reports.map(report => `
        <tr>
            <td>${formatDate(report.tanggal)}</td>
            <td>${report.pelapor}</td>
            <td>${report.uraian}</td>
            <td>${report.foto ? '<i class="fas fa-image text-primary"></i>' : '-'}</td>
            <td><span class="badge ${report.status === 'Selesai' ? 'badge-success' : 'badge-warning'}">${report.status}</span></td>
            ${currentRole === 'admin' ? `
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="editK3Report('${report.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-success" onclick="updateK3Status('${report.id}', 'Selesai')">
                        <i class="fas fa-check"></i>
                    </button>
                </td>
            ` : ''}
        </tr>
    `).join('');
}

function renderMcuTable(requests) {
    const tbody = document.getElementById('mcuTableBody');
    if (!requests || requests.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">Tidak ada data permohonan MCU</td></tr>';
        return;
    }
    
    tbody.innerHTML = requests.map(req => `
        <tr>
            <td>${formatDate(req.tanggal)}</td>
            <td>${req.pemohon}</td>
            <td>${req.alasan}</td>
            <td>${formatDate(req.tanggalRencana)}</td>
            <td><span class="badge ${getStatusBadgeClass(req.status)}">${req.status}</span></td>
            ${currentRole === 'admin' ? `
                <td>
                    <button class="btn btn-sm btn-success me-1" onclick="updateMcuStatus('${req.id}', 'Disetujui')">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="updateMcuStatus('${req.id}', 'Ditolak')">
                        <i class="fas fa-times"></i>
                    </button>
                </td>
            ` : ''}
        </tr>
    `).join('');
}

function renderApdTable(requests) {
    const tbody = document.getElementById('apdTableBody');
    if (!requests || requests.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="text-center">Tidak ada data permintaan APD</td></tr>';
        return;
    }
    
    tbody.innerHTML = requests.map(req => `
        <tr>
            <td>${formatDate(req.tanggal)}</td>
            <td>${req.pemohon}</td>
            <td>${req.nomorSepatu}</td>
            <td>${req.nomorBaju}</td>
            <td>${req.nomorCelana}</td>
            <td>${req.kacamata}</td>
            <td>${req.warnaHelm}</td>
            <td><span class="badge ${getStatusBadgeClass(req.status)}">${req.status}</span></td>
            ${currentRole === 'admin' ? `
                <td>
                    <button class="btn btn-sm btn-success me-1" onclick="updateApdStatus('${req.id}', 'Disetujui')">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="updateApdStatus('${req.id}', 'Ditolak')">
                        <i class="fas fa-times"></i>
                    </button>
                </td>
            ` : ''}
        </tr>
    `).join('');
}

// Modal Functions
function showEmployeeModal(employee = null) {
    const modal = new bootstrap.Modal(document.getElementById('employeeModal'));
    const title = document.getElementById('employeeModalTitle');
    const form = document.getElementById('employeeForm');
    
    if (employee) {
        title.textContent = 'Edit Karyawan';
        fillEmployeeForm(employee);
    } else {
        title.textContent = 'Tambah Karyawan';
        form.reset();
    }
    
    modal.show();
}

function showAttendanceModal() {
    const modal = new bootstrap.Modal(document.getElementById('attendanceModal'));
    document.getElementById('attendanceDate').value = new Date().toISOString().split('T')[0];
    modal.show();
}

function showK3Modal() {
    const modal = new bootstrap.Modal(document.getElementById('k3Modal'));
    document.getElementById('k3Date').value = new Date().toISOString().split('T')[0];
    
    if (currentRole === 'admin') {
        document.getElementById('k3StatusGroup').style.display = 'block';
    }
    
    modal.show();
}

function showMcuModal() {
    const modal = new bootstrap.Modal(document.getElementById('mcuModal'));
    document.getElementById('mcuDate').value = new Date().toISOString().split('T')[0];
    
    if (currentRole === 'admin') {
        document.getElementById('mcuStatusGroup').style.display = 'block';
    }
    
    modal.show();
}

function showApdModal() {
    const modal = new bootstrap.Modal(document.getElementById('apdModal'));
    document.getElementById('apdDate').value = new Date().toISOString().split('T')[0];
    
    if (currentRole === 'admin') {
        document.getElementById('apdStatusGroup').style.display = 'block';
    }
    
    modal.show();
}

// Form Handling Functions
function handleAttendanceStatusChange() {
    const status = document.getElementById('attendanceStatus').value;
    const shiftGroup = document.getElementById('shiftGroup');
    const cutiGroup = document.getElementById('cutiGroup');
    
    shiftGroup.style.display = (status === 'Hadir Masuk' || status === 'Hadir Pulang') ? 'block' : 'none';
    cutiGroup.style.display = status === 'Cuti' ? 'block' : 'none';
}

function resetForm(modalId) {
    const form = document.querySelector(`#${modalId} form`);
    if (form) {
        form.reset();
    }
    
    // Hide conditional fields
    document.getElementById('shiftGroup').style.display = 'none';
    document.getElementById('cutiGroup').style.display = 'none';
    document.getElementById('k3StatusGroup').style.display = 'none';
    document.getElementById('mcuStatusGroup').style.display = 'none';
    document.getElementById('apdStatusGroup').style.display = 'none';
}

// Save Functions
function saveEmployee() {
    const formData = new FormData(document.getElementById('employeeForm'));
    const data = Object.fromEntries(formData.entries());
    
    showLoading();
    fetch(`${SCRIPT_URL}?action=saveEmployee`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        hideLoading();
        if (result.success) {
            bootstrap.Modal.getInstance(document.getElementById('employeeModal')).hide();
            loadEmployees();
            showAlert('Data karyawan berhasil disimpan', 'success');
        } else {
            showAlert(result.message || 'Gagal menyimpan data karyawan', 'danger');
        }
    })
    .catch(error => {
        hideLoading();
        console.error('Error saving employee:', error);
        showAlert('Terjadi kesalahan saat menyimpan data', 'danger');
    });
}

function saveAttendance() {
    const formData = new FormData(document.getElementById('attendanceForm'));
    const data = Object.fromEntries(formData.entries());
    data.email = currentUser.email;
    data.nama = currentUser.nama;
    
    showLoading();
    fetch(`${SCRIPT_URL}?action=saveAttendance`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        hideLoading();
        if (result.success) {
            bootstrap.Modal.getInstance(document.getElementById('attendanceModal')).hide();
            loadAttendance();
            showAlert('Absensi berhasil disimpan', 'success');
        } else {
            showAlert(result.message || 'Gagal menyimpan absensi', 'danger');
        }
    })
    .catch(error => {
        hideLoading();
        console.error('Error saving attendance:', error);
        showAlert('Terjadi kesalahan saat menyimpan absensi', 'danger');
    });
}

function saveK3Report() {
    const formData = new FormData(document.getElementById('k3Form'));
    const data = Object.fromEntries(formData.entries());
    data.pelapor = currentUser.nama;
    data.email = currentUser.email;
    
    showLoading();
    fetch(`${SCRIPT_URL}?action=saveK3Report`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        hideLoading();
        if (result.success) {
            bootstrap.Modal.getInstance(document.getElementById('k3Modal')).hide();
            loadK3Reports();
            showAlert('Laporan K3 berhasil disimpan', 'success');
        } else {
            showAlert(result.message || 'Gagal menyimpan laporan K3', 'danger');
        }
    })
    .catch(error => {
        hideLoading();
        console.error('Error saving K3 report:', error);
        showAlert('Terjadi kesalahan saat menyimpan laporan', 'danger');
    });
}

function saveMcuRequest() {
    const formData = new FormData(document.getElementById('mcuForm'));
    const data = Object.fromEntries(formData.entries());
    data.pemohon = currentUser.nama;
    data.email = currentUser.email;
    
    showLoading();
    fetch(`${SCRIPT_URL}?action=saveMcuRequest`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        hideLoading();
        if (result.success) {
            bootstrap.Modal.getInstance(document.getElementById('mcuModal')).hide();
            loadMcuRequests();
            showAlert('Permohonan MCU berhasil disimpan', 'success');
        } else {
            showAlert(result.message || 'Gagal menyimpan permohonan MCU', 'danger');
        }
    })
    .catch(error => {
        hideLoading();
        console.error('Error saving MCU request:', error);
        showAlert('Terjadi kesalahan saat menyimpan permohonan', 'danger');
    });
}

function saveApdRequest() {
    const formData = new FormData(document.getElementById('apdForm'));
    const data = Object.fromEntries(formData.entries());
    data.pemohon = currentUser.nama;
    data.email = currentUser.email;
    
    showLoading();
    fetch(`${SCRIPT_URL}?action=saveApdRequest`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        hideLoading();
        if (result.success) {
            bootstrap.Modal.getInstance(document.getElementById('apdModal')).hide();
            loadApdRequests();
            showAlert('Permintaan APD berhasil disimpan', 'success');
        } else {
            showAlert(result.message || 'Gagal menyimpan permintaan APD', 'danger');
        }
    })
    .catch(error => {
        hideLoading();
        console.error('Error saving APD request:', error);
        showAlert('Terjadi kesalahan saat menyimpan permintaan', 'danger');
    });
}

// Utility Functions
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID');
}

function getStatusBadgeClass(status) {
    switch(status) {
        case 'Disetujui':
        case 'Selesai':
            return 'badge-success';
        case 'Ditolak':
            return 'badge-danger';
        case 'Pending':
        case 'Belum':
            return 'badge-warning';
        default:
            return 'badge-info';
    }
}

function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Additional functions for admin operations
function editEmployee(email) {
    // Implementation for editing employee
    console.log('Edit employee:', email);
}

function deleteEmployee(email) {
    if (confirm('Apakah Anda yakin ingin menghapus karyawan ini?')) {
        // Implementation for deleting employee
        console.log('Delete employee:', email);
    }
}

function updateK3Status(id, status) {
    // Implementation for updating K3 status
    console.log('Update K3 status:', id, status);
}

function updateMcuStatus(id, status) {
    // Implementation for updating MCU status
    console.log('Update MCU status:', id, status);
}

function updateApdStatus(id, status) {
    // Implementation for updating APD status
    console.log('Update APD status:', id, status);
}

function generateAttendanceReport() {
    const month = document.getElementById('reportMonth').value;
    if (!month) {
        showAlert('Pilih bulan terlebih dahulu', 'warning');
        return;
    }
    
    // Implementation for generating attendance report
    console.log('Generate attendance report for:', month);
}

function loadStatistics() {
    // Implementation for loading statistics
    console.log('Loading statistics');
}

function loadTodayAttendance() {
    // Implementation for loading today's attendance
    console.log('Loading today attendance');
}

function loadNotifications() {
    // Implementation for loading notifications
    console.log('Loading notifications');
}
