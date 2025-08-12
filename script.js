// Global Variables
let currentUser = null;
let currentRole = null;
let currentModule = 'dashboard';

// Google Apps Script Web App URL (akan diisi setelah deploy)
const SCRIPT_URL = CONFIG.SCRIPT_URL;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    hideLoading();
    setupEventListeners();
    checkLoginStatus();
}

function setupEventListeners() {
    // Login Form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Logout Button
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Modal Save Buttons
    document.getElementById('saveEmployeeBtn').addEventListener('click', saveEmployee);
    document.getElementById('saveAttendanceBtn').addEventListener('click', saveAttendance);
    document.getElementById('saveK3Btn').addEventListener('click', saveK3Report);
    document.getElementById('saveMcuBtn').addEventListener('click', saveMcuRequest);
    document.getElementById('saveApdBtn').addEventListener('click', saveApdRequest);
    
    // Form Change Listeners
    document.getElementById('attendanceStatus').addEventListener('change', handleAttendanceStatusChange);
    
    // Modal Close Events
    const modals = ['employeeModal', 'attendanceModal', 'k3Modal', 'mcuModal', 'apdModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        modal.addEventListener('hidden.bs.modal', () => resetForm(modalId));
    });
}

// Loading Functions
function showLoading() {
    document.getElementById('loadingScreen').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingScreen').style.display = 'none';
}

// Authentication Functions
function checkLoginStatus() {
    const user = localStorage.getItem('hris_user');
    if (user) {
        currentUser = JSON.parse(user);
        currentRole = currentUser.role;
        showMainApp();
        loadDashboard();
    } else {
        showLoginScreen();
    }
}

function handleLogin(e) {
    e.preventDefault();
    showLoading();
    
    const email = document.getElementById('email').value;
    
    // Call Google Apps Script to authenticate
    fetch(`${SCRIPT_URL}?action=login&email=${encodeURIComponent(email)}`)
        .then(response => response.json())
        .then(data => {
            hideLoading();
            if (data.success) {
                currentUser = data.user;
                currentRole = data.user.role;
                localStorage.setItem('hris_user', JSON.stringify(data.user));
                showMainApp();
                loadDashboard();
            } else {
                showLoginError(data.message);
            }
        })
        .catch(error => {
            hideLoading();
            showLoginError('Terjadi kesalahan saat login. Silakan coba lagi.');
            console.error('Login error:', error);
        });
}

function handleLogout() {
    localStorage.removeItem('hris_user');
    currentUser = null;
    currentRole = null;
    showLoginScreen();
}

function showLoginError(message) {
    const errorDiv = document.getElementById('loginError');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// UI Functions
function showLoginScreen() {
    document.getElementById('loginScreen').style.display = 'block';
    document.getElementById('mainApp').classList.add('d-none');
}

function showMainApp() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('mainApp').classList.remove('d-none');
    document.getElementById('userName').textContent = currentUser.nama;
    setupNavigation();
}

function setupNavigation() {
    const navMenu = document.getElementById('navMenu');
    navMenu.innerHTML = '';
    
    const menuItems = getMenuItems();
    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        li.innerHTML = `
            <a class="nav-link" href="#" onclick="loadModule('${item.id}')">
                <i class="${item.icon} me-2"></i>${item.name}
            </a>
        `;
        navMenu.appendChild(li);
    });
}

function getMenuItems() {
    const baseMenu = [
        { id: 'dashboard', name: 'Dashboard', icon: 'fas fa-tachometer-alt' },
        { id: 'attendance', name: 'Absensi', icon: 'fas fa-clock' },
        { id: 'k3', name: 'Laporan K3', icon: 'fas fa-exclamation-triangle' },
        { id: 'mcu', name: 'Permohonan MCU', icon: 'fas fa-stethoscope' },
        { id: 'apd', name: 'Permintaan APD', icon: 'fas fa-hard-hat' }
    ];
    
    if (currentRole === 'admin') {
        baseMenu.splice(1, 0, { id: 'employees', name: 'Data Karyawan', icon: 'fas fa-users' });
        baseMenu.push({ id: 'reports', name: 'Laporan', icon: 'fas fa-chart-bar' });
    }
    
    return baseMenu;
}
