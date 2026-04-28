import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../shared/components/navbar.component';
import { Footer } from '../../shared/components/footer.component';
import { ServiceCard } from '../../shared/components/service-card.component';
import { SERVICES, Service, getServicesByCategory, getServicesByPlatform, searchServices } from '../../core/data/services.data';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [FormsModule, RouterLink, Navbar, Footer, ServiceCard],
  template: `
    <app-navbar />
    
    <section class="catalog-section">
      <div class="catalog-container">
        <!-- Header -->
        <header class="catalog-header">
          <div class="catalog-header-top">
            <div class="catalog-title-group">
              <span class="catalog-badge">Deployment Hub</span>
              <h1 class="catalog-title">Service Catalog</h1>
            </div>
            <div class="catalog-search">
              <span class="material-symbols-outlined">search</span>
              <input 
                type="text" 
                placeholder="Search Agents..." 
                id="search-input"
                [ngModel]="searchQuery()"
                (ngModelChange)="searchQuery.set($event)">
            </div>
          </div>

          <!-- Filters -->
          <div class="catalog-filters">
            <div class="catalog-filter-group">
              <span class="catalog-filter-label">Platforms</span>
              <div class="catalog-filter-chips">
                <button 
                  class="catalog-filter-chip" 
                  [class.active]="activePlatform() === 'all'"
                  (click)="setPlatform('all')">All</button>
                <button 
                  class="catalog-filter-chip" 
                  [class.active]="activePlatform() === 'tiktok'"
                  (click)="setPlatform('tiktok')">TikTok</button>
                <button 
                  class="catalog-filter-chip" 
                  [class.active]="activePlatform() === 'instagram'"
                  (click)="setPlatform('instagram')">Instagram</button>
                <button 
                  class="catalog-filter-chip" 
                  [class.active]="activePlatform() === 'linkedin'"
                  (click)="setPlatform('linkedin')">LinkedIn</button>
              </div>
            </div>
            <div class="catalog-filter-divider"></div>
            <div class="catalog-filter-group">
              <span class="catalog-filter-label">Content Type</span>
              <div class="catalog-filter-chips">
                <button 
                  class="catalog-filter-chip" 
                  [class.active]="activeCategory() === 'all'"
                  (click)="setCategory('all')">All</button>
                <button 
                  class="catalog-filter-chip" 
                  [class.active]="activeCategory() === 'video'"
                  (click)="setCategory('video')">Video</button>
                <button 
                  class="catalog-filter-chip" 
                  [class.active]="activeCategory() === 'copy'"
                  (click)="setCategory('copy')">Copy</button>
                <button 
                  class="catalog-filter-chip" 
                  [class.active]="activeCategory() === 'static'"
                  (click)="setCategory('static')">Static</button>
                <button 
                  class="catalog-filter-chip" 
                  [class.active]="activeCategory() === 'analytics'"
                  (click)="setCategory('analytics')">Analytics</button>
              </div>
            </div>
          </div>
        </header>

        <!-- Grid -->
        <div class="catalog-grid">
          @for (service of filteredServices(); track service.id) {
            <app-service-card [service]="service" />
          } @empty {
            <p class="no-results">No agents found matching your criteria.</p>
          }
        </div>

        <!-- Promo -->
        <div class="catalog-promo">
          <div class="catalog-promo-content">
            <span class="catalog-promo-badge">Enterprise Customization</span>
            <h2 class="catalog-promo-title">Build Your Own Dedicated Agent</h2>
            <p class="catalog-promo-description">Don't see a specific solution? Our engineering team can fine-tune a custom LLM specifically for your brand voice and historical data.</p>
            <a routerLink="/contact" class="btn btn-primary" style="width: fit-content;">Schedule Consultation</a>
          </div>
          <div class="catalog-promo-image">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqK9v-k8F-2cOJAei37o3rp3QSTt1_PS_y4-cVBvmispvLok2WuojqYeZoleflWoZ70oOe-ZAyYAevkTEO7XRLQpFTMnkGCPFGRv2ImehTlMQJRdjmIO9PYqyCmL7UOCvQbPpcNRKNfVT7-7KmI6bslla6Yv5mLEhmetvD8q4HRFTncBLGmYra8BIkvGd9uCbCf3DioOE6JH7fA4HNckEGDBb2jDr2ANvILUD-li_2PWshmtrEB5CDQIj_hutQ9QgVhWi6BOCAt5M" alt="Enterprise">
          </div>
        </div>
      </div>
    </section>

    <app-footer />
  `,
  styles: [`
    .catalog-section {
      padding-top: 6rem;
      padding-bottom: 5rem;
      min-height: 100vh;
    }

    .catalog-container {
      max-width: 80rem;
      margin: 0 auto;
      padding: 0 2rem;
    }

    /* Header */
    .catalog-header {
      margin-bottom: 3rem;
    }

    .catalog-header-top {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    @media (min-width: 768px) {
      .catalog-header-top {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
      }
    }

    .catalog-title-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .catalog-badge {
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--primary);
    }

    .catalog-title {
      font-size: 2.5rem;
      font-weight: 900;
      letter-spacing: -0.025em;
      color: var(--on-surface);
    }

    @media (min-width: 768px) {
      .catalog-title { font-size: 3rem; }
    }

    /* Search */
    .catalog-search {
      position: relative;
      width: 100%;
    }

    @media (min-width: 640px) {
      .catalog-search { width: 16rem; }
    }

    .catalog-search input {
      width: 100%;
      padding: 0.625rem 1rem 0.625rem 2.5rem;
      background: var(--surface-container-lowest);
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-md);
      color: var(--on-surface);
      font-size: 0.875rem;
      transition: all 0.2s ease;
    }

    .catalog-search input:focus {
      outline: none;
      border-color: var(--primary);
    }

    .catalog-search .material-symbols-outlined {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #64748b;
      font-size: 1.25rem;
      transition: color 0.2s ease;
    }

    .catalog-search:focus-within .material-symbols-outlined {
      color: var(--primary);
    }

    /* Filters */
    .catalog-filters {
      margin-top: 2rem;
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      align-items: flex-start;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid rgba(68, 71, 77, 0.3);
    }

    .catalog-filter-group {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .catalog-filter-label {
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #64748b;
    }

    .catalog-filter-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .catalog-filter-chip {
      padding: 0.375rem 1rem;
      font-size: 0.75rem;
      font-weight: 700;
      border-radius: var(--radius-md);
      background: var(--secondary-container);
      color: var(--on-secondary-container);
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .catalog-filter-chip:hover {
      background: var(--surface-bright);
    }

    .catalog-filter-chip.active {
      background: var(--primary);
      color: var(--on-primary);
    }

    .catalog-filter-divider {
      height: 2.5rem;
      width: 1px;
      background: rgba(68, 71, 77, 0.3);
      display: none;
    }

    @media (min-width: 768px) {
      .catalog-filter-divider { display: block; }
    }

    /* Grid */
    .catalog-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    @media (min-width: 640px) {
      .catalog-grid { grid-template-columns: repeat(2, 1fr); }
    }

    @media (min-width: 1024px) {
      .catalog-grid { grid-template-columns: repeat(3, 1fr); }
    }

    .no-results {
      grid-column: 1 / -1;
      text-align: center;
      padding: 4rem;
      color: var(--on-surface-variant);
      font-size: 1rem;
    }

    /* Promo Section */
    .catalog-promo {
      margin-top: 5rem;
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    @media (min-width: 1024px) {
      .catalog-promo {
        grid-template-columns: repeat(12, 1fr);
      }
    }

    .catalog-promo-content {
      background: var(--surface-container-high);
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-xl);
      padding: 2.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    @media (min-width: 1024px) {
      .catalog-promo-content { grid-column: span 7; }
    }

    .catalog-promo-badge {
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--primary);
      margin-bottom: 1rem;
    }

    .catalog-promo-title {
      font-size: 1.75rem;
      font-weight: 900;
      letter-spacing: -0.025em;
      color: var(--on-surface);
      margin-bottom: 1rem;
    }

    .catalog-promo-description {
      font-size: 0.875rem;
      color: var(--on-surface-variant);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .catalog-promo-image {
      position: relative;
      min-height: 20rem;
      border-radius: var(--radius-xl);
      overflow: hidden;
    }

    @media (min-width: 1024px) {
      .catalog-promo-image { grid-column: span 5; }
    }

    .catalog-promo-image img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .btn {
      padding: 0.625rem 1rem;
      font-size: 0.75rem;
      font-weight: 700;
      border-radius: var(--radius-lg);
      text-decoration: none;
      letter-spacing: 0.05em;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background: var(--primary);
      color: var(--on-primary);
      border: none;
    }

    .btn-primary:hover {
      filter: brightness(1.1);
    }
  `]
})
export class Catalog {
  searchQuery = signal('');
  activePlatform = signal('all');
  activeCategory = signal('all');

  filteredServices = computed(() => {
    let services = SERVICES;

    const query = this.searchQuery().trim();
    if (query) {
      services = searchServices(query);
    } else {
      const platform = this.activePlatform();
      const category = this.activeCategory();
      
      if (platform !== 'all') {
        services = getServicesByPlatform(platform);
      }
      
      if (category !== 'all') {
        services = services.filter(s => s.category.toLowerCase() === category.toLowerCase());
      }
    }

    return services;
  });

  setPlatform(platform: string): void {
    this.activePlatform.set(platform);
  }

  setCategory(category: string): void {
    this.activeCategory.set(category);
  }
}