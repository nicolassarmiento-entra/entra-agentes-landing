/* ============================================
   AETHERIS AI - Router (Page detection)
   ============================================ */

// Get current page name from URL
function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'landing.html';
    return filename.replace('.html', '');
}

// Get URL parameter
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get service ID from URL
function getServiceId() {
    return getUrlParam('id') || 'viral-reels-creator';
}

// Page mappings
const PAGE_CONFIG = {
    'landing': { title: 'Aetheris AI | Architectural Digital Marketing' },
    'catalog': { title: 'Service Catalog | Aetheris AI' },
    'details': { title: 'Agent Details | Aetheris AI' },
    'contact': { title: 'Contact Us | Aetheris AI' },
    'favorites': { title: 'Saved Agents | Aetheris AI' },
    'admin': { title: 'Admin Panel | Aetheris AI' }
};

// Set page title
function setPageTitle() {
    const page = getCurrentPage();
    const config = PAGE_CONFIG[page];
    if (config && document.title !== config.title) {
        document.title = config.title;
    }
}

// Initialize router on page load
document.addEventListener('DOMContentLoaded', function() {
    setPageTitle();
});

// Export functions
window.getCurrentPage = getCurrentPage;
window.getUrlParam = getUrlParam;
window.getServiceId = getServiceId;
window.PAGE_CONFIG = PAGE_CONFIG;