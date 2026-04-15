/* ============================================
   AETHERIS AI - Components (HTML Generators)
   ============================================ */

const Components = {
    // Generate Navbar HTML
    navbar: function(currentPage) {
        const favorites = Storage.getFavorites();
        const favCount = favorites.length;
        
        return `
        <nav class="navbar">
            <a href="landing.html" class="navbar-logo">Aetheris AI</a>
            <div class="navbar-links md:flex hidden">
                <a href="landing.html" class="navbar-link ${currentPage === 'landing' ? 'active' : ''}">Solutions</a>
                <a href="catalog.html" class="navbar-link ${currentPage === 'catalog' ? 'active' : ''}">Agents</a>
                <a href="#" class="navbar-link">Case Studies</a>
                <a href="contact.html" class="navbar-link ${currentPage === 'contact' ? 'active' : ''}">Pricing</a>
            </div>
            <div class="flex gap-4 items-center">
                <a href="favorites.html" class="navbar-link" title="Favorites">
                    <span class="material-symbols-outlined">favorite</span>
                    ${favCount > 0 ? `<span class="badge badge-primary">${favCount}</span>` : ''}
                </a>
                <a href="contact.html" class="btn btn-primary btn-sm">Get Started</a>
            </div>
        </nav>
        `;
    },
    
    // Generate Footer HTML
    footer: function() {
        return `
        <footer class="footer">
            <div class="footer-logo">Aetheris AI</div>
            <div class="footer-copyright">© 2024 Aetheris AI Digital. Architectural Precision.</div>
            <div class="footer-links">
                <a href="#" class="footer-link">Privacy Policy</a>
                <a href="#" class="footer-link">Terms of Service</a>
                <a href="#" class="footer-link">Security</a>
                <a href="#" class="footer-link">Status</a>
            </div>
        </footer>
        `;
    },
    
    // Generate Service Card HTML
    serviceCard: function(service) {
        const isFavorite = Storage.isFavorite(service.id);
        const statusClass = service.statusType === 'active' ? 'badge-active' : 
                       service.statusType === 'coming' ? 'badge-coming' : 'badge-beta';
        
        return `
        <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
                <div class="card-icon">
                    <span class="material-symbols-outlined">${service.platformIcon}</span>
                </div>
                <span class="badge">${service.platform[0]}</span>
            </div>
            <h3 class="card-title">${service.name}</h3>
            <p class="card-description">${service.shortDescription}</p>
            <div class="card-footer">
                <a href="details.html?id=${service.id}" class="btn btn-secondary btn-sm">View Details</a>
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-service-id="${service.id}" onclick="toggleFavorite('${service.id}')">
                    <span class="material-symbols-outlined" ${isFavorite ? 'style="font-variation-settings: \'FILL\' 1;"' : ''}>favorite</span>
                </button>
            </div>
        </div>
        `;
    },
    
    // Generate Featured Card (Large) for landing page
    featuredCardLarge: function(service) {
        return `
        <div class="featured-card-large card relative overflow-hidden group" style="grid-column: span 1;">
            <div class="relative z-10" style="display: flex; flex-direction: column; height: 100%; justify-content: space-between;">
                <div>
                    <div class="flex items-center gap-3 mb-6">
                        <div class="card-icon" style="width: 3rem; height: 3rem;">
                            <span class="material-symbols-outlined" style="font-size: 1.5rem;">${service.platformIcon}</span>
                        </div>
                        <div>
                            <h3 class="card-title">${service.name}</h3>
                            <p class="text-xs tracking-widest uppercase font-bold" style="color: #64748b;">${service.platform.join(' • ')}</p>
                        </div>
                    </div>
                    <p class="card-description" style="max-width: 28rem;">${service.shortDescription}</p>
                </div>
                <a href="details.html?id=${service.id}" class="btn btn-secondary btn-sm mt-8" style="align-self: flex-start; display: inline-flex; gap: 0.5rem;">
                    View Details <span class="material-symbols-outlined">arrow_forward</span>
                </a>
            </div>
            <div class="featured-image absolute" style="bottom: 0; right: 0; width: 50%; opacity: 0.4;">
                <img src="${service.image}" alt="${service.name}" style="width: 100%; height: auto; object-fit: contain;">
            </div>
        </div>
        `;
    },
    
    // Generate Featured Card (Small)
    featuredCardSmall: function(service) {
        const statusClass = service.statusType === 'active' ? 'badge-active' : 
                         service.statusType === 'coming' ? 'badge-coming' : 'badge-beta';
        
        return `
        <div class="featured-card card" style="padding: 2rem;">
            <div>
                <div class="card-icon-sm card-icon mb-6">
                    <span class="material-symbols-outlined">${service.platformIcon}</span>
                </div>
                <h3 class="card-title" style="font-size: 1.125rem;">${service.name}</h3>
                <p class="card-description" style="font-size: 0.875rem; margin-bottom: 1rem;">${service.shortDescription}</p>
            </div>
            <span class="badge ${statusClass}" style="font-size: 0.625rem;">${service.status}</span>
        </div>
        `;
    },
    
    // Generate Timeline Step
    timelineStep: function(step, index, isLast) {
        return `
        <div class="timeline-step">
            <span class="text-xs font-bold text-primary mb-4 block">PHASE ${step.step}</span>
            <h4 class="text-xl font-bold mb-4">${step.title}</h4>
            <p class="text-sm text-on-surface-variant leading-relaxed">
                ${step.description}
            </p>
        </div>
        `;
    },
    
    // Generate Filter Tabs
    filterTabs: function(activeFilter, type) {
        const platforms = ['All', 'TikTok', 'Instagram', 'LinkedIn'];
        const categories = ['All', 'Video', 'Static', 'Copy'];
        
        const items = type === 'platform' ? platforms : categories;
        
        return `
        <div class="filter-tabs">
            ${items.map(item => `
                <button class="filter-tab ${activeFilter === item.toLowerCase() ? 'active' : ''}" 
                        data-filter="${item.toLowerCase()}" 
                        data-filter-type="${type}">
                    ${item}
                </button>
            `).join('')}
        </div>
        `;
    },
    
    // Generate Deliverables List
    deliverablesList: function(deliverables) {
        return `
        <ul class="deliverables-list">
            ${deliverables.map(item => `
                <li class="deliverable-item">
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>${item}</span>
                </li>
            `).join('')}
        </ul>
        `;
    },
    
    // Generate Flowchart Step
    flowchartStep: function(step, index, isActive) {
        const activeClass = isActive ? 'active' : '';
        
        return `
        <div class="flowchart-step ${activeClass}" style="max-width: 20rem; margin: 0 auto;">
            <div style="width: 3rem; height: 3rem; background: ${isActive ? 'var(--primary)' : 'rgba(180, 197, 255, 0.1)'}; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; border: 1px solid ${isActive ? 'var(--primary)' : 'rgba(180, 197, 255, 0.2)'};">
                <span class="material-symbols-outlined" style="color: ${isActive ? 'var(--on-primary)' : 'var(--primary)'}">${step.icon}</span>
            </div>
            <div style="margin-left: 1rem;">
                <span class="text-xs uppercase tracking-widest font-bold" style="display: block; color: var(--primary);">Step ${step.step}</span>
                <span style="font-weight: 700; color: #fff;">${step.title}</span>
            </div>
        </div>
        ${index < 2 ? `
        <div class="flowchart-connector">
            <div></div>
        </div>
        ` : ''}
        `;
    },
    
    // Generate Enterprise Promo Section
    enterprisePromo: function() {
        return `
        <section style="margin-top: 5rem; grid-template-columns: 1fr; display: grid; gap: 2rem;" class="grid grid-cols-1 lg:grid-cols-12">
            <div class="lg:col-span-7 glass-card" style="padding: 2.5rem;">
                <span class="section-subtitle">Enterprise Customization</span>
                <h2 class="section-title" style="margin-bottom: 1.5rem;">Build Your Own Dedicated Agent</h2>
                <p class="card-description">Don't see a specific solution? Our engineering team can fine-tune a custom LLM specifically for your brand voice and historical data.</p>
                <a href="contact.html" class="btn btn-primary" style="margin-top: 1rem;">Schedule Consultation</a>
            </div>
            <div class="lg:col-span-5 relative" style="min-height: 20rem; overflow: hidden; border-radius: var(--radius-xl);">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqK9v-k8F-2cOJAei37o3rp3QSTt1_PS_y4-cVBvmispvLok2WuojqYeZoleflWoZ70oOe-ZAyYAevkTEO7XRLQpFTMnkGCPFGRv2ImehTlMQJRdjmIO9PYqyCmL7UOCvQbPpcNRKNfVT7-7KmI6bslla6Yv5mLEhmetvD8q4HRFTncBLGmYra8BIkvGd9uCbCf3DioOE6JH7fA4HNckEGDBb2jDr2ANvILUD-li_2PWshmtrEB5CDQIj_hutQ9QgVhWi6BOCAt5M" 
                     alt="Enterprise" 
                     style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;">
            </div>
        </section>
        `;
    },
    
    // Generate Modal HTML
    modal: function(modalId, title, content) {
        return `
        <div id="${modalId}" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    <button class="modal-close" onclick="closeModal('${modalId}')">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
                ${content}
            </div>
        </div>
        `;
    }
};

// Make it globally accessible
window.Components = Components;