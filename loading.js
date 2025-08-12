// Loading indicator for better UX
class LoadingManager {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.loadingText = document.createElement('div');
        this.loadingText.className = 'loading-text';
        this.loadingText.innerHTML = 'Memuat aplikasi...';
        this.loadingScreen.appendChild(this.loadingText);
    }

    show(message = 'Memuat...') {
        this.loadingText.textContent = message;
        this.loadingScreen.style.display = 'flex';
    }

    hide() {
        this.loadingScreen.style.display = 'none';
    }

    updateMessage(message) {
        this.loadingText.textContent = message;
    }
}

// Initialize loading manager
const loadingManager = new LoadingManager();

// Add loading text styles
const style = document.createElement('style');
style.textContent = `
    .loading-text {
        color: white;
        margin-top: 20px;
        font-size: 16px;
        text-align: center;
    }
    
    .loading-screen {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .spinner {
        border-top-color: white;
    }
`;
document.head.appendChild(style);
