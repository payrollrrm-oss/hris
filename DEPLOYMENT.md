# Deployment Guide

Panduan lengkap untuk deployment aplikasi HRIS System ke berbagai platform.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Google Apps Script Setup](#google-apps-script-setup)
- [Google Sheets Setup](#google-sheets-setup)
- [Frontend Deployment](#frontend-deployment)
- [Configuration](#configuration)
- [Testing](#testing)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Sebelum deployment, pastikan Anda memiliki:

- [ ] Google account
- [ ] Akses ke Google Apps Script
- [ ] Akses ke Google Sheets
- [ ] Domain/hosting untuk frontend (opsional)
- [ ] Basic knowledge tentang web development

## Google Apps Script Setup

### Step 1: Create Google Apps Script Project

1. Buka [Google Apps Script](https://script.google.com)
2. Klik "New Project"
3. Ganti nama project menjadi "HRIS System"
4. Hapus semua kode default

### Step 2: Add Backend Code

1. Copy-paste isi file `Code.gs` ke editor
2. Update `SPREADSHEET_ID` dengan ID spreadsheet Anda
3. Save project (Ctrl+S atau Cmd+S)

### Step 3: Deploy as Web App

1. Klik "Deploy" > "New deployment"
2. Pilih "Web app" sebagai type
3. Set "Execute as" ke "Me"
4. Set "Who has access" ke "Anyone"
5. Klik "Deploy"
6. Authorize aplikasi jika diminta
7. Copy URL yang dihasilkan

### Step 4: Test Backend

1. Buka URL Google Apps Script di browser
2. Tambahkan `?action=getDashboardData` di akhir URL
3. Pastikan response JSON muncul

## Google Sheets Setup

### Step 1: Create Spreadsheet

1. Buka [Google Sheets](https://sheets.google.com)
2. Buat spreadsheet baru
3. Ganti nama menjadi "HRIS Database"
4. Copy ID dari URL (format: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`)

### Step 2: Setup Database Structure

1. Buka Google Apps Script project
2. Pilih fungsi `setupSpreadsheet` dari dropdown
3. Klik "Run"
4. Authorize jika diminta
5. Cek spreadsheet - 5 sheet baru akan dibuat

### Step 3: Add Sample Data

1. Fungsi `setupSpreadsheet` akan otomatis menambahkan sample data
2. Atau jalankan fungsi `addSampleData()` untuk menambah data sample
3. Cek sheet "DataKaryawan" untuk data sample

### Step 4: Configure Permissions

1. Buka spreadsheet
2. Klik "Share" di pojok kanan atas
3. Tambahkan email Google Apps Script sebagai "Editor"
4. Set permission ke "Anyone with the link can view"

## Frontend Deployment

### Option 1: GitHub Pages (Free)

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/hris-system.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Buka repository di GitHub
   - Go to Settings > Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
   - Save

3. **Update Configuration**
   - Edit file `config.js`
   - Update `SCRIPT_URL` dengan URL Google Apps Script
   - Commit dan push perubahan

### Option 2: Netlify (Free)

1. **Deploy to Netlify**
   - Buka [Netlify](https://netlify.com)
   - Drag & drop folder project ke Netlify
   - Atau connect dengan GitHub repository

2. **Configure Domain**
   - Netlify akan memberikan URL custom
   - Atau setup custom domain jika ada

3. **Update Configuration**
   - Edit file `config.js`
   - Update `SCRIPT_URL`
   - Redeploy jika diperlukan

### Option 3: Vercel (Free)

1. **Deploy to Vercel**
   - Buka [Vercel](https://vercel.com)
   - Import project dari GitHub
   - Vercel akan otomatis detect static files

2. **Configure Settings**
   - Framework Preset: Other
   - Build Command: (kosongkan)
   - Output Directory: (kosongkan)

3. **Deploy**
   - Klik "Deploy"
   - Vercel akan memberikan URL

### Option 4: Firebase Hosting (Free)

1. **Setup Firebase**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   ```

2. **Configure Firebase**
   - Public directory: (kosongkan)
   - Configure as single-page app: No
   - Set up automatic builds: No

3. **Deploy**
   ```bash
   firebase deploy
   ```

### Option 5: Traditional Web Hosting

1. **Upload Files**
   - Upload semua file ke web server
   - Pastikan struktur folder tetap sama

2. **Configure Web Server**
   - Apache: Pastikan `.htaccess` berfungsi
   - Nginx: Configure untuk static files
   - IIS: Set MIME types untuk JavaScript

## Configuration

### Update Configuration Files

1. **config.js**
   ```javascript
   const CONFIG = {
       SCRIPT_URL: 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL',
       SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID',
       // ... other config
   };
   ```

2. **Code.gs**
   ```javascript
   const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
   ```

### Environment Variables (Optional)

Untuk production, gunakan environment variables:

```javascript
const CONFIG = {
    SCRIPT_URL: process.env.SCRIPT_URL || 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL',
    SPREADSHEET_ID: process.env.SPREADSHEET_ID || 'YOUR_SPREADSHEET_ID',
};
```

### CORS Configuration

Jika ada masalah CORS:

1. **Google Apps Script**
   ```javascript
   function doGet(e) {
       return ContentService
           .createTextOutput(JSON.stringify(response))
           .setMimeType(ContentService.MimeType.JSON)
           .setHeader('Access-Control-Allow-Origin', '*')
           .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
           .setHeader('Access-Control-Allow-Headers', 'Content-Type');
   }
   ```

2. **Web Server**
   - Apache: Tambahkan di `.htaccess`
   - Nginx: Tambahkan di config
   - IIS: Configure web.config

## Testing

### Pre-deployment Testing

1. **Local Testing**
   ```bash
   # Start local server
   python -m http.server 8000
   # atau
   npm start
   ```

2. **Backend Testing**
   - Test semua API endpoints
   - Cek response format
   - Test error handling

3. **Frontend Testing**
   - Test di berbagai browser
   - Test responsive design
   - Test semua fitur

### Post-deployment Testing

1. **Functional Testing**
   - Login/logout
   - CRUD operations
   - Form validation
   - Error handling

2. **Performance Testing**
   - Load time
   - API response time
   - Mobile performance

3. **Security Testing**
   - Authentication
   - Authorization
   - Input validation
   - XSS protection

## Monitoring

### Google Apps Script Monitoring

1. **View Logs**
   - Buka Google Apps Script
   - Go to View > Execution log
   - Monitor error logs

2. **Set Up Alerts**
   - Configure email notifications
   - Monitor execution time
   - Track API usage

### Frontend Monitoring

1. **Error Tracking**
   - Google Analytics
   - Sentry
   - LogRocket

2. **Performance Monitoring**
   - Google PageSpeed Insights
   - WebPageTest
   - Lighthouse

### Database Monitoring

1. **Google Sheets**
   - Monitor sheet size
   - Track API quotas
   - Backup data regularly

## Troubleshooting

### Common Issues

#### 1. CORS Errors
```
Access to fetch at 'URL' from origin 'URL' has been blocked by CORS policy
```

**Solution:**
- Update Google Apps Script headers
- Check web server CORS configuration
- Use proxy jika diperlukan

#### 2. Spreadsheet Not Found
```
Spreadsheet not found
```

**Solution:**
- Cek SPREADSHEET_ID
- Pastikan spreadsheet di-share dengan Google Apps Script
- Cek permissions

#### 3. Authentication Errors
```
Login failed
```

**Solution:**
- Cek email di sheet DataKaryawan
- Pastikan role sudah benar
- Cek Google Apps Script permissions

#### 4. Slow Performance
```
Application is slow
```

**Solution:**
- Optimize Google Apps Script
- Implement caching
- Reduce API calls
- Use CDN untuk static files

#### 5. Mobile Issues
```
Not working on mobile
```

**Solution:**
- Test responsive design
- Check viewport meta tag
- Optimize for mobile
- Test touch interactions

### Debug Mode

Enable debug mode untuk troubleshooting:

```javascript
const DEBUG = true;

function debug(message, data = null) {
    if (DEBUG) {
        console.log(`[DEBUG] ${message}`, data);
    }
}
```

### Logging

Implement proper logging:

```javascript
function logError(error, context = '') {
    console.error(`[ERROR] ${context}:`, error);
    // Send to monitoring service
}
```

## Maintenance

### Regular Tasks

1. **Weekly**
   - Check error logs
   - Monitor performance
   - Backup data

2. **Monthly**
   - Update dependencies
   - Review security
   - Performance optimization

3. **Quarterly**
   - Full security audit
   - Feature updates
   - User feedback review

### Backup Strategy

1. **Google Sheets Backup**
   - Export to Excel/CSV
   - Use Google Drive versioning
   - Automated backup scripts

2. **Code Backup**
   - Version control (Git)
   - Multiple deployment environments
   - Documentation updates

### Update Process

1. **Development**
   - Test changes locally
   - Update documentation
   - Create backup

2. **Staging**
   - Deploy to staging environment
   - Test thoroughly
   - Get approval

3. **Production**
   - Deploy to production
   - Monitor closely
   - Rollback plan ready

## Support

### Getting Help

1. **Documentation**: README.md
2. **Issues**: GitHub Issues
3. **Community**: GitHub Discussions
4. **Email**: support@hris-system.com

### Emergency Contacts

- **Technical Issues**: tech@hris-system.com
- **Security Issues**: security@hris-system.com
- **Business Issues**: business@hris-system.com

---

## Quick Deployment Checklist

- [ ] Google Apps Script deployed
- [ ] Google Sheets configured
- [ ] Frontend deployed
- [ ] Configuration updated
- [ ] CORS configured
- [ ] Authentication working
- [ ] All features tested
- [ ] Performance optimized
- [ ] Monitoring setup
- [ ] Documentation updated
- [ ] Backup configured
- [ ] Support contacts ready

---

**Note**: Pastikan untuk selalu test deployment di environment staging sebelum production, dan selalu backup data sebelum melakukan perubahan besar.
