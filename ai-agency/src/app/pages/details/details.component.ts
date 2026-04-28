import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Navbar } from '../../shared/components/navbar.component';
import { Footer } from '../../shared/components/footer.component';
import { getServiceById, Service } from '../../core/data/services.data';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, Navbar, Footer],
  template: `
    <app-navbar />
    
    <section class="details-section">
      <div class="details-container">
        @if (service(); as svc) {
          <!-- Breadcrumb -->
          <div class="details-breadcrumb">
            <a routerLink="/catalog" class="breadcrumb-link">← Back to Catalog</a>
          </div>

          <!-- Header -->
          <div class="details-header">
            <span class="details-category">{{ svc.category }}</span>
            <h1 class="details-title">{{ svc.name }}</h1>
            <p class="details-description">{{ svc.fullDescription }}</p>
          </div>

          <!-- Content Grid -->
          <div class="details-grid">
            <!-- Left Column -->
            <div class="details-info">
              <!-- Platforms -->
              <div class="details-platforms">
                @for (platform of svc.platform; track platform) {
                  <span class="details-platform">
                    <span class="material-symbols-outlined">{{ getPlatformIcon(platform) }}</span>
                    {{ platform }}
                  </span>
                }
              </div>

              <!-- Deliverables -->
              <div class="details-card">
                <h3 class="details-card-title">Standard Deliverables</h3>
                <ul class="deliverables-list">
                  @for (item of svc.deliverables; track item) {
                    <li class="deliverable-item">
                      <span class="material-symbols-outlined">check_circle</span>
                      <span>{{ item }}</span>
                    </li>
                  }
                </ul>
              </div>

              <!-- CTAs -->
              <div class="details-ctas">
                <a routerLink="/contact" class="details-btn primary">
                  <span class="material-symbols-outlined">rocket_launch</span>
                  Request Campaign
                </a>
                <button class="details-btn secondary" [class.active]="isFavorite()" (click)="toggleFav()">
                  <span class="material-symbols-outlined">favorite</span>
                  <span>{{ isFavorite() ? 'Saved to Favorites' : 'Save to Favorites' }}</span>
                </button>
              </div>

              <!-- Testimonial -->
              <div class="details-testimonial">
                <p class="details-testimonial-text">"{{ svc.testimonial }}"</p>
              </div>
            </div>

            <!-- Right Column - Workflow -->
            <div class="details-workflow">
              <div class="workflow-card">
                <div class="workflow-blueprint"></div>
                <div class="workflow-glow top-right"></div>
                <div class="workflow-glow bottom-left"></div>

                <h3 class="workflow-title">Implementation Flow</h3>

                <div class="workflow-steps">
                  @for (step of svc.steps; track step.step) {
                    <div class="workflow-step">
                      <div class="workflow-step-icon">
                        <span class="material-symbols-outlined">{{ step.icon }}</span>
                      </div>
                      <span class="workflow-step-number">Step {{ step.step }}</span>
                      <h4 class="workflow-step-title">{{ step.title }}</h4>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        } @else {
          <div style="text-align: center; padding: 4rem 2rem;">
            <span class="material-symbols-outlined" style="font-size: 4rem; color: #64748b; margin-bottom: 1rem;">error</span>
            <h2 style="font-size: 1.5rem; color: var(--on-surface); margin-bottom: 0.5rem;">Service not found</h2>
            <p style="color: var(--on-surface-variant); margin-bottom: 2rem;">The agent you're looking for doesn't exist or has been removed.</p>
            <a routerLink="/catalog" class="details-btn primary" style="display: inline-flex;">Browse Catalog</a>
          </div>
        }
      </div>
    </section>

    <app-footer />
  `,
  styles: [`
    .details-section {
      padding-top: 8rem;
      padding-bottom: 5rem;
      min-height: 100vh;
    }

    .details-container {
      max-width: 80rem;
      margin: 0 auto;
      padding: 0 2rem;
    }

    /* Breadcrumb */
    .details-breadcrumb {
      margin-bottom: 2rem;
    }

    .breadcrumb-link {
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--primary);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .breadcrumb-link:hover {
      color: #fff;
    }

    /* Header */
    .details-header {
      margin-bottom: 3rem;
    }

    .details-title {
      font-size: 2.5rem;
      font-weight: 900;
      letter-spacing: -0.025em;
      color: var(--on-surface);
      line-height: 1.1;
      margin-bottom: 1rem;
    }

    @media (min-width: 768px) {
      .details-title { font-size: 3.5rem; }
    }

    .details-description {
      font-size: 1.125rem;
      color: var(--on-surface-variant);
      line-height: 1.7;
      max-width: 48rem;
    }

    .details-category {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: rgba(180, 197, 255, 0.1);
      border: 1px solid rgba(180, 197, 255, 0.2);
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--primary);
      margin-bottom: 1rem;
    }

    /* Content Grid */
    .details-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    @media (min-width: 1024px) {
      .details-grid {
        grid-template-columns: repeat(12, 1fr);
      }
    }

    /* Left Column */
    .details-info {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    @media (min-width: 1024px) {
      .details-info { grid-column: span 5; }
    }

    /* Platform Badge */
    .details-platforms {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .details-platform {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: var(--surface-container-highest);
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--on-surface);
    }

    .details-platform .material-symbols-outlined {
      font-size: 1rem;
      color: var(--primary);
    }

    /* Deliverables Card */
    .details-card {
      background: rgba(28, 42, 65, 0.7);
      backdrop-filter: blur(12px);
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-xl);
      padding: 2rem;
    }

    .details-card-title {
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--primary);
      margin-bottom: 1.5rem;
    }

    .deliverables-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      list-style: none;
    }

    .deliverable-item {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .deliverable-item .material-symbols-outlined {
      color: var(--primary);
      font-size: 1.25rem;
      font-variation-settings: 'FILL' 1;
    }

    .deliverable-item span:last-child {
      font-size: 0.875rem;
      color: var(--on-surface);
    }

    /* CTA Buttons */
    .details-ctas {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    @media (min-width: 640px) {
      .details-ctas { flex-direction: row; }
    }

    .details-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 1rem 1.5rem;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      border-radius: var(--radius-lg);
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      border: none;
    }

    .details-btn.primary {
      background: var(--primary);
      color: var(--on-primary);
      flex: 1;
    }

    .details-btn.primary:hover {
      filter: brightness(1.1);
    }

    .details-btn.secondary {
      background: transparent;
      color: var(--on-surface);
      border: 1px solid var(--outline-variant);
    }

    .details-btn.secondary:hover {
      background: var(--surface-bright);
      border-color: var(--error);
      color: var(--error);
    }

    .details-btn.secondary.active {
      color: #ef4444;
      border-color: #ef4444;
    }

    .details-btn.secondary.active .material-symbols-outlined {
      font-variation-settings: 'FILL' 1;
    }

    .details-btn .material-symbols-outlined {
      font-size: 1.25rem;
    }

    /* Testimonial */
    .details-testimonial {
      padding: 1.5rem;
      border-left: 3px solid var(--primary);
      background: var(--surface-container-low);
      border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
    }

    .details-testimonial-text {
      font-size: 0.875rem;
      color: var(--on-surface-variant);
      line-height: 1.6;
      font-style: italic;
      margin-bottom: 0.75rem;
    }

    /* Right Column - Workflow */
    .details-workflow {
      position: relative;
    }

    @media (min-width: 1024px) {
      .details-workflow { grid-column: span 7; }
    }

    .workflow-card {
      background: rgba(28, 42, 65, 0.7);
      backdrop-filter: blur(12px);
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-xl);
      padding: 3rem;
      min-height: 28rem;
      position: relative;
      overflow: hidden;
    }

    .workflow-title {
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--primary);
      margin-bottom: 2rem;
      text-align: center;
    }

    .workflow-steps {
      display: flex;
      flex-direction: column;
      gap: 0;
      position: relative;
      z-index: 10;
    }

    @media (min-width: 640px) {
      .workflow-steps {
        flex-direction: row;
        justify-content: space-between;
        align-items: stretch;
      }
    }

    .workflow-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 1.5rem;
      background: var(--surface-container-highest);
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-lg);
      transition: all 0.3s ease;
      flex: 1;
    }

    @media (min-width: 640px) {
      .workflow-step {
        padding: 2rem 1.5rem;
      }

      .workflow-step:not(:last-child) {
        margin-right: 1rem;
      }
    }

    .workflow-step:hover {
      border-color: var(--primary);
      transform: translateY(-4px);
    }

    .workflow-step-icon {
      width: 4rem;
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(180, 197, 255, 0.1);
      border: 2px solid rgba(180, 197, 255, 0.2);
      border-radius: var(--radius-lg);
      margin-bottom: 1rem;
      transition: all 0.3s ease;
    }

    .workflow-step:hover .workflow-step-icon {
      background: var(--primary);
      border-color: var(--primary);
    }

    .workflow-step-icon .material-symbols-outlined {
      font-size: 1.5rem;
      color: var(--primary);
      transition: color 0.3s ease;
    }

    .workflow-step:hover .workflow-step-icon .material-symbols-outlined {
      color: var(--on-primary);
    }

    .workflow-step-number {
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--primary);
      margin-bottom: 0.5rem;
    }

    .workflow-step-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--on-surface);
    }

    /* Blueprint Overlay */
    .workflow-blueprint {
      position: absolute;
      inset: 0;
      opacity: 0.05;
      pointer-events: none;
      background-image:
        linear-gradient(0deg, transparent 24%, var(--outline-variant) 25%, var(--outline-variant) 26%, transparent 27%, transparent 74%, var(--outline-variant) 75%, var(--outline-variant) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, var(--outline-variant) 25%, var(--outline-variant) 26%, transparent 27%, transparent 74%, var(--outline-variant) 75%, var(--outline-variant) 76%, transparent 77%, transparent);
      background-size: 3rem 3rem;
    }

    /* Glow Effects */
    .workflow-glow {
      position: absolute;
      width: 12rem;
      height: 12rem;
      background: var(--primary);
      filter: blur(100px);
      opacity: 0.08;
      border-radius: 50%;
      pointer-events: none;
    }

    .workflow-glow.top-right {
      top: -4rem;
      right: -4rem;
    }

    .workflow-glow.bottom-left {
      bottom: -4rem;
      left: -4rem;
      background: #0053db;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .details-title { font-size: 2rem; }
      .workflow-card { padding: 2rem 1.5rem; }
    }
  `]
})
export class Details {
  private route = inject(ActivatedRoute);
  private favoritesService = inject(FavoritesService);
  
  serviceId = signal<string>('');
  
  service = computed(() => {
    const id = this.serviceId();
    return id ? getServiceById(id) : undefined;
  });
  
  isFavorite = () => {
    const id = this.serviceId();
    return id ? this.favoritesService.isFavorite(id) : false;
  };
  
  constructor() {
    this.route.queryParams.subscribe(params => {
      this.serviceId.set(params['id'] || 'viral-reels-creator');
    });
  }
  
  getPlatformIcon(platform: string): string {
    const icons: Record<string, string> = {
      'TikTok': 'movie',
      'Instagram': 'photo_camera',
      'LinkedIn': 'article',
      'Facebook': 'share',
      'X/Twitter': 'chat',
      'Multi-Channel': 'campaign',
      'Community': 'forum',
      'Analytics': 'monitoring',
      'Meta': 'campaign',
      'Google': 'search',
      'Shorts': 'movie',
      'Blog': 'article',
      'Website': 'language'
    };
    return icons[platform] || 'smart_toy';
  }
  
  toggleFav(): void {
    const id = this.serviceId();
    if (id) {
      this.favoritesService.toggle(id);
    }
  }
}