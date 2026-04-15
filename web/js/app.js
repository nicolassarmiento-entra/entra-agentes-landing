const App = {
    data: {
        services: [],
        favorites: [],
        currentPage: 'home'
    },

    async init() {
        await this.loadServices();
        this.loadFavorites();
        this.initRouter();
        this.renderCurrentPage();
    },

    async loadServices() {
        try {
            const response = await fetch('./data/services.json');
            this.data.services = await response.json();
        } catch (error) {
            console.error('Error loading services:', error);
            this.data.services = [];
        }
    },

    loadFavorites() {
        const stored = localStorage.getItem('aetheris_favorites');
        if (stored) {
            this.data.favorites = JSON.parse(stored);
        }
    },

    saveFavorites() {
        localStorage.setItem('aetheris_favorites', JSON.stringify(this.data.favorites));
    },

    toggleFavorite(serviceId) {
        const index = this.data.favorites.indexOf(serviceId);
        if (index > -1) {
            this.data.favorites.splice(index, 1);
            this.showToast('Removed from favorites', 'success');
        } else {
            this.data.favorites.push(serviceId);
            this.showToast('Added to favorites', 'success');
        }
        this.saveFavorites();
        this.updateFavoriteButtons();
    },

    isFavorite(serviceId) {
        return this.data.favorites.includes(serviceId);
    },

    getServiceById(id) {
        return this.data.services.find(s => s.id === id);
    },

    getFavoriteServices() {
        return this.data.services.filter(s => this.data.favorites.includes(s.id));
    },

    initRouter() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '') || 'landing';
        
        const pageMapping = {
            'index': 'landing',
            '': 'landing',
            'landing': 'landing',
            'servicecatalog': 'servicecatalog',
            'details': 'details',
            'contactform': 'contactform',
            'favorites': 'favorites',
            'admin': 'admin'
        };
        
        this.data.currentPage = pageMapping[page] || 'landing';
    },

    renderCurrentPage() {
        const container = document.getElementById('app');
        if (!container) return;

        switch (this.data.currentPage) {
            case 'index':
            case '':
                this.renderHome(container);
                break;
            case 'landing':
                this.renderHome(container);
                break;
            case 'servicecatalog':
                this.renderCatalog(container);
                break;
            case 'details':
                this.renderDetails(container);
                break;
            case 'contactform':
                this.renderContact(container);
                break;
            case 'favorites':
                this.renderFavorites(container);
                break;
            case 'admin':
                this.renderAdmin(container);
                break;
            default:
                this.renderHome(container);
        }
    },

    renderHome(container) {
        container.innerHTML = `
            <nav class="nav">
                <a href="landing.html" class="nav-logo">Aetheris AI</a>
                <div class="nav-links">
                    <a href="landing.html" class="nav-link ${this.data.currentPage === 'landing' ? 'active' : ''}">Solutions</a>
                    <a href="servicecatalog.html" class="nav-link ${this.data.currentPage === 'servicecatalog' ? 'active' : ''}">Agents</a>
                    <a href="#" class="nav-link">Case Studies</a>
                    <a href="contactform.html" class="nav-link">Pricing</a>
                </div>
                <div class="flex gap-4 items-center">
                    <a href="favorites.html" class="nav-link">
                        <span class="material-symbols-outlined">favorite</span>
                        ${this.data.favorites.length > 0 ? `<span class="badge badge-primary">${this.data.favorites.length}</span>` : ''}
                    </a>
                    <a href="contactform.html" class="btn btn-primary">Get Started</a>
                </div>
            </nav>
            <main>
                <section class="hero">
                    <div class="glow glow-top-right"></div>
                    <div class="glow glow-bottom-left"></div>
                    <div class="container">
                        <span class="section-subtitle">The Future of Digital Agency</span>
                        <h1 class="hero-title">
                            Scale your digital presence with <span class="text-primary">AI-driven</span> marketing agents
                        </h1>
                        <p class="hero-subtitle">
                            Automate your content strategy across Social Media with high-fidelity creative generation.
                        </p>
                        <div class="hero-buttons">
                            <a href="servicecatalog.html" class="btn btn-primary">Get Started</a>
                            <button class="btn btn-secondary">Watch Demo</button>
                        </div>
                    </div>
                </section>
                <section class="section bg-surface">
                    <div class="container">
                        <div class="page-header">
                            <h2 class="section-title">Featured AI Agents</h2>
                            <div class="h-1 w-20 bg-primary" style="height: 4px; width: 80px; background: var(--primary);"></div>
                        </div>
                        <div class="grid grid-3">
                            ${this.data.services.slice(0, 6).map(service => this.renderServiceCard(service)).join('')}
                        </div>
                    </div>
                </section>
                <section class="section bg-surface-container">
                    <div class="container">
                        <div class="text-center" style="margin-bottom: 5rem;">
                            <p class="section-subtitle">Implementation Protocol</p>
                            <h2 class="section-title">How it Works</h2>
                        </div>
                        <div class="grid grid-4" style="border-top: 1px solid var(--outline-variant);">
                            <div class="p-8" style="border-right: 1px solid var(--outline-variant);">
                                <span class="section-subtitle">PHASE 01</span>
                                <h3 class="card-title">Select Agent</h3>
                                <p class="card-description">Choose from our library of specialized marketing agents.</p>
                            </div>
                            <div class="p-8" style="border-right: 1px solid var(--outline-variant);">
                                <span class="section-subtitle">PHASE 02</span>
                                <h3 class="card-title">Input Brand Context</h3>
                                <p class="card-description">Upload brand guidelines to align the AI with your identity.</p>
                            </div>
                            <div class="p-8" style="border-right: 1px solid var(--outline-variant);">
                                <span class="section-subtitle">PHASE 03</span>
                                <h3 class="card-title">AI Generation</h3>
                                <p class="card-description">Our agents construct high-fidelity creatives within seconds.</p>
                            </div>
                            <div class="p-8">
                                <span class="section-subtitle">PHASE 04</span>
                                <h3 class="card-title">Review & Launch</h3>
                                <p class="card-description">Approve the generated assets or request refinements.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="section bg-surface">
                    <div class="container">
                        <div class="glass-card" style="text-align: center; padding: 4rem;">
                            <h2 class="section-title">Ready to deploy your first AI marketing team?</h2>
                            <a href="contactform.html" class="btn btn-primary" style="margin-top: 2rem; padding: 1rem 3rem; font-size: 1.125rem;">Get Started Now</a>
                            <p class="text-muted" style="margin-top: 1rem; font-size: var(--font-size-xs); letter-spacing: 0.1em;">No credit card required</p>
                        </div>
                    </div>
                </section>
            </main>
            ${this.renderFooter()}
            <div id="toast" class="toast"></div>
        `;
        this.bindEvents();
    },

    renderCatalog(container) {
        container.innerHTML = `
            <nav class="nav">
                <a href="landing.html" class="nav-logo">Aetheris AI</a>
                <div class="nav-links">
                    <a href="landing.html" class="nav-link">Solutions</a>
                    <a href="servicecatalog.html" class="nav-link active">Agents</a>
                    <a href="#" class="nav-link">Case Studies</a>
                    <a href="contactform.html" class="nav-link">Pricing</a>
                </div>
                <div class="flex gap-4 items-center">
                    <a href="favorites.html" class="nav-link">
                        <span class="material-symbols-outlined">favorite</span>
                        ${this.data.favorites.length > 0 ? `<span class="badge badge-primary">${this.data.favorites.length}</span>` : ''}
                    </a>
                    <a href="contactform.html" class="btn btn-primary">Get Started</a>
                </div>
            </nav>
            <main class="main-content">
                <div class="container">
                    <div class="page-header" style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
                            <div>
                                <span class="page-subtitle">Deployment Hub</span>
                                <h1 class="page-title">Service Catalog</h1>
                            </div>
                        </div>
                        <div class="tabs">
                            <button class="tab active" data-filter="all">All</button>
                            <button class="tab" data-filter="Video">Video</button>
                            <button class="tab" data-filter="Copy">Copy</button>
                            <button class="tab" data-filter="Static">Static</button>
                            <button class="tab" data-filter="Analytics">Analytics</button>
                        </div>
                    </div>
                    <div class="grid grid-3" id="services-grid">
                        ${this.data.services.map(service => this.renderServiceCard(service)).join('')}
                    </div>
                    <section class="section" style="margin-top: 4rem;">
                        <div class="grid" style="grid-template-columns: 2fr 1fr; gap: 2rem;">
                            <div class="glass-card" style="padding: 2.5rem;">
                                <span class="section-subtitle">Enterprise Customization</span>
                                <h2 class="section-title" style="margin-bottom: 1.5rem;">Build Your Own Dedicated Agent</h2>
                                <p class="card-description">Don't see a specific solution? Our engineering team can fine-tune a custom LLM specifically for your brand.</p>
                                <a href="contactform.html" class="btn btn-primary">Schedule Consultation</a>
                            </div>
                            <div style="position: relative; overflow: hidden; border-radius: var(--radius-xl);">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqK9v-k8F-2cOJAei37o3rp3QSTt1_PS_y4-cVBvmispvLok2WuojqYeZoleflWoZ70oOe-ZAyYAevkTEO7XRLQpFTMnkGCPFGRv2ImehTlMQJRdjmIO9PYqyCmL7UOCvQbPpcNRKNfVT7-7KmI6bslla6Yv5mLEhmetvD8q4HRFTncBLGmYra8BIkvGd9uCbCf3DioOE6JH7fA4HNckEGDBb2jDr2ANvILUD-li_2PWshmtrEB5CDQIj_hutQ9QgVhWi6BOCAt5M" alt="Enterprise" style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0;">
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            ${this.renderFooter()}
            <div id="toast" class="toast"></div>
        `;
        this.bindEvents();
        this.initCatalogFilters();
    },

    renderDetails(container) {
        const params = new URLSearchParams(window.location.search);
        const serviceId = params.get('id') || 'viral-reels-creator';
        const service = this.getServiceById(serviceId);

        if (!service) {
            container.innerHTML = '<div class="empty-state"><span class="material-symbols-outlined">error</span><p>Service not found</p></div>';
            return;
        }

        const isFav = this.isFavorite(service.id);

        container.innerHTML = `
            <nav class="nav">
                <a href="landing.html" class="nav-logo">Aetheris AI</a>
                <div class="nav-links">
                    <a href="landing.html" class="nav-link">Solutions</a>
                    <a href="servicecatalog.html" class="nav-link active">Agents</a>
                    <a href="#" class="nav-link">Case Studies</a>
                    <a href="contactform.html" class="nav-link">Pricing</a>
                </div>
                <div class="flex gap-4 items-center">
                    <a href="favorites.html" class="nav-link">
                        <span class="material-symbols-outlined">favorite</span>
                        ${this.data.favorites.length > 0 ? `<span class="badge badge-primary">${this.data.favorites.length}</span>` : ''}
                    </a>
                    <a href="contactform.html" class="btn btn-primary">Get Started</a>
                </div>
            </nav>
            <main class="main-content architectural-grid">
                <div class="container">
                    <div style="margin-bottom: 2rem;">
                        <span class="text-muted" style="font-size: var(--font-size-sm);">Agent Directory / ${service.category}</span>
                    </div>
                    <div class="grid" style="grid-template-columns: 1fr 1.5fr; gap: 3rem; align-items: start;">
                        <div>
                            <h1 class="page-title">${service.name}</h1>
                            <p class="card-description" style="font-size: var(--font-size-lg); margin: 1.5rem 0;">${service.fullDescription}</p>
                            <div class="glass-card" style="margin-bottom: 1.5rem;">
                                <h3 class="section-subtitle">Standard Deliverables</h3>
                                <ul style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                                    ${service.deliverables.map(item => `
                                        <li style="display: flex; align-items: center; gap: 1rem;">
                                            <span class="material-symbols-outlined text-primary">check_circle</span>
                                            <span>${item}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                                <a href="contactform.html" class="btn btn-primary" style="flex: 1; padding: 1rem;">
                                    <span class="material-symbols-outlined">rocket_launch</span>
                                    Request Campaign
                                </a>
                                <button class="btn btn-secondary favorite-btn ${isFav ? 'active' : ''}" data-id="${service.id}">
                                    <span class="material-symbols-outlined" style="${isFav ? 'font-variation-settings: \"FILL\" 1;' : ''}">favorite</span>
                                    ${isFav ? 'Saved' : 'Save to Favorites'}
                                </button>
                            </div>
                            <div class="p-4" style="margin-top: 1rem; border-left: 2px solid var(--primary); background: var(--surface-container-low); border-radius: var(--radius-md); font-style: italic;">
                                "${service.testimonial}"
                            </div>
                        </div>
                        <div>
                            <div class="glass-card" style="padding: 3rem; min-height: 500px;">
                                ${service.steps.map((step, index) => `
                                    <div style="text-align: center; position: relative;">
                                        <div style="background: var(--surface-container-highest); border: 1px solid var(--outline-variant); padding: 1.5rem; border-radius: var(--radius-lg); display: inline-flex; align-items: center; gap: 1.5rem; text-align: left; width: 100%; max-width: 300px;">
                                            <div style="width: 3rem; height: 3rem; background: var(--primary); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                                                <span class="material-symbols-outlined" style="color: var(--on-primary);">${step.icon}</span>
                                            </div>
                                            <div>
                                                <span class="section-subtitle" style="display: block;">Step ${step.step}</span>
                                                <span style="font-weight: 700; color: #fff;">${step.title}</span>
                                            </div>
                                        </div>
                                        ${index < service.steps.length - 1 ? `
                                            <div style="height: 3rem; display: flex; justify-content: center; align-items: center;">
                                                <div style="width: 2px; height: 100%; background: var(--outline-variant); position: relative;">
                                                    <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 8px; height: 8px; background: var(--primary); border-radius: 50%;"></div>
                                                </div>
                                            </div>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            ${this.renderFooter()}
            <div id="toast" class="toast"></div>
        `;
        this.bindEvents();
    },

    renderContact(container) {
        container.innerHTML = `
            <nav class="nav">
                <a href="landing.html" class="nav-logo">Aetheris AI</a>
                <div class="nav-links">
                    <a href="landing.html" class="nav-link">Solutions</a>
                    <a href="servicecatalog.html" class="nav-link">Agents</a>
                    <a href="#" class="nav-link">Case Studies</a>
                    <a href="contactform.html" class="nav-link">Pricing</a>
                </div>
                <div class="flex gap-4 items-center">
                    <a href="favorites.html" class="nav-link">
                        <span class="material-symbols-outlined">favorite</span>
                        ${this.data.favorites.length > 0 ? `<span class="badge badge-primary">${this.data.favorites.length}</span>` : ''}
                    </a>
                    <a href="contactform.html" class="btn btn-primary">Get Started</a>
                </div>
            </nav>
            <main class="main-content">
                <div class="container">
                    <div class="grid" style="grid-template-columns: 1fr 1.5fr; gap: 3rem; align-items: start;">
                        <div>
                            <span class="section-subtitle">Connect With Intelligence</span>
                            <h1 class="page-title">Scale your digital footprint.</h1>
                            <p class="card-description" style="font-size: var(--font-size-lg); margin: 1.5rem 0 2rem;">Our AI agents are ready to deploy. Share your goals, and we'll engineer a marketing strategy.</p>
                            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <div class="card-icon">
                                        <span class="material-symbols-outlined text-primary">terminal</span>
                                    </div>
                                    <div>
                                        <span class="section-subtitle">Fast Deployment</span>
                                        <span style="font-weight: 500;">Ready in &lt; 24 hours</span>
                                    </div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <div class="card-icon">
                                        <span class="material-symbols-outlined text-primary">query_stats</span>
                                    </div>
                                    <div>
                                        <span class="section-subtitle">Precision Analytics</span>
                                        <span style="font-weight: 500;">Real-time attribution</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <form id="contact-form" class="glass-card" style="padding: 3rem;">
                                <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                                    <div class="form-group">
                                        <label class="form-label" for="name">Name</label>
                                        <input type="text" id="name" name="name" class="form-input" placeholder="John Doe" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label" for="email">Email</label>
                                        <input type="email" id="email" name="email" class="form-input" placeholder="john@example.com" required>
                                        <span class="error-message" id="email-error">Please enter a valid email</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="company">Company</label>
                                    <input type="text" id="company" name="company" class="form-input" placeholder="Acme Digital">
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="message">Message</label>
                                    <textarea id="message" name="message" class="form-textarea" placeholder="Tell us about your project..." rows="4"></textarea>
                                </div>
                                <button type="submit" class="btn btn-purple btn-full" style="padding: 1.25rem;">
                                    Submit Inquiry
                                    <span class="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </form>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding: 0 1rem;">
                                <span class="text-muted" style="font-size: var(--font-size-xs); letter-spacing: 0.1em;">Secured by Aetheris Shield</span>
                                <div style="display: flex; gap: 1rem;">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfI0D8nCTI0lW4buUGCAo4gITb88dGI7I8g1RHX6FYybpQ7g6ufnS4-QONffAXJ3yk9WEWLcayxsEra2pG92eAYJU-26fGnSfsW2p2nPNopTtXU7h_3WBY2xQ5hjesYXy74AJbgqCRjHCnxWwvwarKkNGWTa2LNw9XzYXf5nDxASKhqiSgiOePmRJykyVbABFMXNcsZIjdt20ieP5c0HDV-HNW60_ou8MgACCLK975FwH5xlVb_GA_KApBHVkcAw_rML7ZTJ_KBUA" alt="ISO" style="height: 1rem; opacity: 0.4; filter: grayscale(1);">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMheIkhKqCYlUTpxRnilEIg6JObMC6-HinSTSp4Jrfr_cxisG-B6H_aSf_2o8O6jzU_CRyKrr7fapbXRBjiSWJ-RRaND0Gu9jC2rGE4NqVDsIAYyOXhARJqtX7mK1A3zJWWJapBy5B1d4wrnEAkPUV95UVR4Bz0bI8XrH1cUVLLxNo9YXWkG5x_dNSdbzZ_Ehh4DG7luJnau845OqTzkZ2NwORes0s-1V5074HjtpegziDKYTVJGQcYax0eLs8qzmOkbCdq1HBl3w" alt="GDPR" style="height: 1rem; opacity: 0.4; filter: grayscale(1);">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            ${this.renderFooter()}
            <div id="toast" class="toast"></div>
        `;
        this.bindEvents();
        this.initContactForm();
    },

    renderFavorites(container) {
        const favorites = this.getFavoriteServices();

        container.innerHTML = `
            <nav class="nav">
                <a href="landing.html" class="nav-logo">Aetheris AI</a>
                <div class="nav-links">
                    <a href="landing.html" class="nav-link">Solutions</a>
                    <a href="servicecatalog.html" class="nav-link">Agents</a>
                    <a href="favorites.html" class="nav-link active">Favorites</a>
                    <a href="contactform.html" class="nav-link">Pricing</a>
                </div>
                <div class="flex gap-4 items-center">
                    <a href="admin.html" class="nav-link" title="Admin Panel">
                        <span class="material-symbols-outlined">settings</span>
                    </a>
                    <a href="contactform.html" class="btn btn-primary">Get Started</a>
                </div>
            </nav>
            <main class="main-content">
                <div class="container">
                    <div class="page-header">
                        <span class="page-subtitle">Your Selection</span>
                        <h1 class="page-title">Saved Agents</h1>
                    </div>
                    ${favorites.length === 0 ? `
                        <div class="empty-state">
                            <span class="material-symbols-outlined">favorite_border</span>
                            <h3>No favorites yet</h3>
                            <p class="text-muted">Start exploring our agents and save your favorites</p>
                            <a href="servicecatalog.html" class="btn btn-primary" style="margin-top: 1rem;">Browse Agents</a>
                        </div>
                    ` : `
                        <div class="grid grid-3">
                            ${favorites.map(service => this.renderServiceCard(service)).join('')}
                        </div>
                    `}
                </div>
            </main>
            ${this.renderFooter()}
            <div id="toast" class="toast"></div>
        `;
        this.bindEvents();
    },

    renderAdmin(container) {
        container.innerHTML = `
            <nav class="nav">
                <a href="landing.html" class="nav-logo">Aetheris AI</a>
                <div class="nav-links">
                    <a href="landing.html" class="nav-link">Solutions</a>
                    <a href="servicecatalog.html" class="nav-link">Agents</a>
                    <a href="favorites.html" class="nav-link">Favorites</a>
                    <a href="admin.html" class="nav-link active">Admin</a>
                </div>
                <div class="flex gap-4 items-center">
                    <a href="contactform.html" class="btn btn-primary">Get Started</a>
                </div>
            </nav>
            <main class="main-content">
                <div class="container">
                    <div class="page-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                        <div>
                            <span class="page-subtitle">Management Console</span>
                            <h1 class="page-title">Admin Panel</h1>
                        </div>
                        <button id="add-service-btn" class="btn btn-primary">
                            <span class="material-symbols-outlined">add</span>
                            Add Service
                        </button>
                    </div>
                    <div class="glass-card">
                        <h3 class="section-subtitle" style="margin-bottom: 1.5rem;">Active Services</h3>
                        <div style="overflow-x: auto;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <thead>
                                    <tr style="border-bottom: 1px solid var(--outline-variant);">
                                        <th style="text-align: left; padding: 1rem; font-size: var(--font-size-xs); letter-spacing: 0.1em; text-transform: uppercase; color: var(--on-surface-variant);">Name</th>
                                        <th style="text-align: left; padding: 1rem; font-size: var(--font-size-xs); letter-spacing: 0.1em; text-transform: uppercase; color: var(--on-surface-variant);">Category</th>
                                        <th style="text-align: left; padding: 1rem; font-size: var(--font-size-xs); letter-spacing: 0.1em; text-transform: uppercase; color: var(--on-surface-variant);">Status</th>
                                        <th style="text-align: right; padding: 1rem; font-size: var(--font-size-xs); letter-spacing: 0.1em; text-transform: uppercase; color: var(--on-surface-variant);">Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="admin-services-list">
                                    ${this.data.services.map(service => `
                                        <tr style="border-bottom: 1px solid var(--outline-variant);">
                                            <td style="padding: 1rem; font-weight: 500;">${service.name}</td>
                                            <td style="padding: 1rem;"><span class="badge">${service.category}</span></td>
                                            <td style="padding: 1rem;"><span class="badge ${service.status === 'Active Agent' ? 'badge-primary' : ''}">${service.status}</span></td>
                                            <td style="padding: 1rem; text-align: right;">
                                                <button class="btn btn-secondary delete-service-btn" data-id="${service.id}" style="padding: 0.5rem 1rem; font-size: var(--font-size-xs);">
                                                    <span class="material-symbols-outlined" style="font-size: 1rem;">delete</span>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            ${this.renderFooter()}
            <div id="toast" class="toast"></div>
            <div id="modal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">Add New Service</h3>
                        <button class="modal-close" onclick="App.closeModal()">
                            <span class="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <form id="add-service-form">
                        <div class="form-group">
                            <label class="form-label" for="new-service-name">Service Name</label>
                            <input type="text" id="new-service-name" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="new-service-description">Short Description</label>
                            <textarea id="new-service-description" class="form-textarea" required></textarea>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="new-service-category">Category</label>
                            <select id="new-service-category" class="form-input">
                                <option value="Video">Video</option>
                                <option value="Copy">Copy</option>
                                <option value="Static">Static</option>
                                <option value="Analytics">Analytics</option>
                                <option value="Community">Community</option>
                                <option value="Multi-Channel">Multi-Channel</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary btn-full">Add Service</button>
                    </form>
                </div>
            </div>
        `;
        this.bindEvents();
        this.initAdmin();
    },

    renderServiceCard(service) {
        const isFav = this.isFavorite(service.id);
        return `
            <div class="card">
                <div class="card-header">
                    <div class="card-icon">
                        <span class="material-symbols-outlined" style="font-size: 1.5rem;">${service.platformIcon}</span>
                    </div>
                    <span class="badge">${service.platform[0]}</span>
                </div>
                <h3 class="card-title">${service.name}</h3>
                <p class="card-description">${service.shortDescription}</p>
                <div class="card-footer" style="display: flex; justify-content: space-between; align-items: center;">
                    <a href="details.html?id=${service.id}" class="btn btn-secondary">View Details</a>
                    <button class="favorite-btn ${isFav ? 'active' : ''}" data-id="${service.id}">
                        <span class="material-symbols-outlined" style="${isFav ? 'font-variation-settings: \'FILL\' 1;' : ''}">favorite</span>
                    </button>
                </div>
            </div>
        `;
    },

    renderFooter() {
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

    bindEvents() {
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                this.toggleFavorite(id);
                this.renderCurrentPage();
            });
        });
    },

    initCatalogFilters() {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const filter = tab.dataset.filter;
                const grid = document.getElementById('services-grid');
                const filtered = filter === 'all' 
                    ? this.data.services 
                    : this.data.services.filter(s => s.category === filter);
                grid.innerHTML = filtered.map(s => this.renderServiceCard(s)).join('');
                this.bindEvents();
            });
        });
    },

    initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const company = document.getElementById('company').value.trim();
            const message = document.getElementById('message').value.trim();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('email').classList.add('form-error');
                document.getElementById('email-error').classList.add('show');
                return;
            }

            if (!name || !email) {
                this.showToast('Please fill in all required fields', 'error');
                return;
            }

            this.showToast(`Thank you ${name}! We'll contact you at ${email}`, 'success');
            form.reset();
        });
    },

    initAdmin() {
        const addBtn = document.getElementById('add-service-btn');
        const modal = document.getElementById('modal');
        const form = document.getElementById('add-service-form');

        if (addBtn) {
            addBtn.addEventListener('click', () => {
                modal.classList.add('show');
            });
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('new-service-name').value;
                const description = document.getElementById('new-service-description').value;
                const category = document.getElementById('new-service-category').value;

                const newService = {
                    id: name.toLowerCase().replace(/\s+/g, '-'),
                    name: name,
                    shortDescription: description,
                    fullDescription: description,
                    platform: ['Custom'],
                    platformIcon: 'smart_toy',
                    deliverables: ['Custom Implementation'],
                    steps: [
                        {step: '01', title: 'Consultation', icon: 'meeting_room'},
                        {step: '02', title: 'Development', icon: 'build'},
                        {step: '03', title: 'Delivery', icon: 'check_circle'}
                    ],
                    testimonial: 'New custom agent added.',
                    status: 'Active Agent',
                    image: '',
                    category: category
                };

                this.data.services.push(newService);
                this.closeModal();
                this.showToast('Service added successfully', 'success');
                this.renderCurrentPage();
            });
        }

        document.querySelectorAll('.delete-service-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                if (confirm('Are you sure you want to delete this service?')) {
                    this.data.services = this.data.services.filter(s => s.id !== id);
                    this.showToast('Service deleted', 'success');
                    this.renderCurrentPage();
                }
            });
        });
    },

    closeModal() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.classList.remove('show');
        }
    },

    updateFavoriteButtons() {
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            const id = btn.dataset.id;
            if (this.isFavorite(id)) {
                btn.classList.add('active');
                btn.querySelector('.material-symbols-outlined').style.fontVariationSettings = "'FILL' 1";
            } else {
                btn.classList.remove('active');
                btn.querySelector('.material-symbols-outlined').style.fontVariationSettings = "'FILL' 0";
            }
        });
    },

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        if (!toast) return;
        
        toast.textContent = message;
        toast.className = `toast toast-${type} show`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());