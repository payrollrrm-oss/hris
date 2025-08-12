# Contributing to HRIS System

Terima kasih atas minat Anda untuk berkontribusi pada project HRIS System! 

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)

## Code of Conduct

Project ini mengikuti [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). Dengan berpartisipasi, Anda diharapkan untuk mematuhi kode ini.

## How Can I Contribute?

### Reporting Bugs

Sebelum membuat bug report, cek apakah masalah sudah dilaporkan:

1. Cek [existing issues](https://github.com/yourusername/hris-system/issues)
2. Cek [FAQ](README.md#troubleshooting)
3. Cek [documentation](README.md)

### Suggesting Enhancements

Jika Anda memiliki ide untuk fitur baru:

1. Cek [existing enhancement requests](https://github.com/yourusername/hris-system/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)
2. Buat issue dengan label `enhancement`
3. Jelaskan fitur yang diinginkan secara detail

### Pull Requests

1. Fork repository
2. Buat branch untuk fitur/fix Anda
3. Commit perubahan Anda
4. Push ke branch Anda
5. Buat Pull Request

## Development Setup

### Prerequisites

- Node.js (v14 atau lebih baru)
- Git
- Google account untuk Google Apps Script
- Google Sheets

### Local Development

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/hris-system.git
   cd hris-system
   ```

2. **Install dependencies** (jika menggunakan npm)
   ```bash
   npm install
   ```

3. **Setup Google Apps Script**
   - Buka [Google Apps Script](https://script.google.com)
   - Buat project baru
   - Copy-paste isi file `Code.gs`
   - Update `SPREADSHEET_ID` dengan ID spreadsheet Anda

4. **Setup Google Sheets**
   - Buat spreadsheet baru
   - Jalankan fungsi `setupSpreadsheet()` di Google Apps Script
   - Share spreadsheet dengan akun Google Apps Script

5. **Update configuration**
   - Edit file `config.js`
   - Update `SCRIPT_URL` dengan URL Google Apps Script Web App
   - Update `SPREADSHEET_ID` dengan ID spreadsheet

6. **Run locally**
   ```bash
   npm start
   # atau
   python -m http.server 8000
   ```

7. **Open browser**
   - Buka `http://localhost:8000`

## Pull Request Process

1. **Update documentation**
   - Update README.md jika diperlukan
   - Update CHANGELOG.md dengan perubahan Anda
   - Update dokumentasi API jika ada perubahan

2. **Testing**
   - Test fitur baru di browser
   - Test di mobile device
   - Test di berbagai browser (Chrome, Firefox, Safari, Edge)

3. **Code review**
   - Pastikan kode mengikuti coding standards
   - Pastikan tidak ada console.log yang tertinggal
   - Pastikan error handling sudah benar

4. **Submit PR**
   - Buat Pull Request dengan deskripsi yang jelas
   - Tambahkan screenshot jika ada perubahan UI
   - Link ke issue yang terkait

## Coding Standards

### JavaScript

- Gunakan ES6+ features
- Gunakan `const` dan `let` (hindari `var`)
- Gunakan arrow functions
- Gunakan template literals
- Gunakan destructuring
- Gunakan async/await untuk promises

```javascript
// ✅ Good
const user = await getUser(id);
const { name, email } = user;

// ❌ Bad
var user = getUser(id).then(function(user) {
    var name = user.name;
    var email = user.email;
});
```

### HTML

- Gunakan semantic HTML5
- Gunakan proper indentation
- Gunakan meaningful class names
- Gunakan proper alt attributes untuk images

```html
<!-- ✅ Good -->
<main class="main-content">
    <section class="employee-section">
        <h2>Data Karyawan</h2>
        <table class="employee-table">
            <!-- table content -->
        </table>
    </section>
</main>

<!-- ❌ Bad -->
<div class="main">
    <div class="section">
        <div class="title">Data Karyawan</div>
        <div class="table">
            <!-- table content -->
        </div>
    </div>
</div>
```

### CSS

- Gunakan BEM methodology untuk class naming
- Gunakan CSS custom properties untuk colors dan spacing
- Gunakan flexbox/grid untuk layout
- Gunakan mobile-first approach

```css
/* ✅ Good */
.employee-card {
    background-color: var(--color-white);
    border-radius: var(--border-radius);
    padding: var(--spacing-md);
}

.employee-card__title {
    color: var(--color-primary);
    font-size: var(--font-size-lg);
}

/* ❌ Bad */
.employee-card {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 16px;
}

.employee-card-title {
    color: #667eea;
    font-size: 18px;
}
```

## Testing

### Manual Testing

1. **Cross-browser testing**
   - Chrome (latest)
   - Firefox (latest)
   - Safari (latest)
   - Edge (latest)

2. **Responsive testing**
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)

3. **Functionality testing**
   - Login/logout
   - CRUD operations
   - Form validation
   - Error handling

### Automated Testing

Untuk menambahkan automated testing:

1. Setup testing framework (Jest, Mocha, dll)
2. Write unit tests untuk functions
3. Write integration tests untuk API
4. Setup CI/CD pipeline

## Documentation

### Code Documentation

- Gunakan JSDoc untuk JavaScript functions
- Gunakan comments untuk complex logic
- Gunakan meaningful variable names

```javascript
/**
 * Validates user input for employee data
 * @param {Object} employeeData - Employee data to validate
 * @returns {Object} Validation result with success status and errors
 */
function validateEmployeeData(employeeData) {
    const errors = [];
    
    // Validate required fields
    if (!employeeData.email) {
        errors.push('Email is required');
    }
    
    return {
        success: errors.length === 0,
        errors: errors
    };
}
```

### API Documentation

- Dokumentasikan semua API endpoints
- Jelaskan request/response format
- Berikan contoh penggunaan

## Reporting Bugs

### Bug Report Template

```markdown
**Bug Description**
A clear and concise description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- Browser: [e.g. Chrome 91.0.4472.124]
- OS: [e.g. Windows 10]
- Device: [e.g. Desktop/Mobile]

**Screenshots**
If applicable, add screenshots to help explain the problem.

**Additional Context**
Add any other context about the problem here.
```

## Suggesting Enhancements

### Enhancement Request Template

```markdown
**Enhancement Description**
A clear and concise description of the enhancement.

**Problem Statement**
What problem does this enhancement solve?

**Proposed Solution**
Describe the solution you'd like to see.

**Alternative Solutions**
Describe any alternative solutions you've considered.

**Additional Context**
Add any other context or screenshots about the enhancement request.
```

## Getting Help

Jika Anda membutuhkan bantuan:

1. **Documentation**: Cek [README.md](README.md)
2. **Issues**: Cek [existing issues](https://github.com/yourusername/hris-system/issues)
3. **Discussions**: Gunakan [GitHub Discussions](https://github.com/yourusername/hris-system/discussions)
4. **Email**: support@hris-system.com

## Recognition

Kontributor akan diakui di:

- [README.md](README.md#contributors)
- [CHANGELOG.md](CHANGELOG.md)
- Release notes

## License

Dengan berkontribusi, Anda setuju bahwa kontribusi Anda akan dilisensikan di bawah [MIT License](LICENSE).

---

Terima kasih atas kontribusi Anda! 🎉
