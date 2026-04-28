import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../shared/components/navbar.component';
import { Footer } from '../../shared/components/footer.component';
import { getFeaturedServices, Service } from '../../core/data/services.data';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, Navbar, Footer],
  template: `
    <app-navbar />
    <main>
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-bg">
          <img class="hero-bg-image"
               src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcxNkUQfaVoGwDI-B35AeVaQKb11UjOXOrxiS3DAp0tWRvvufdIABPeLQ89AXRDss_NX45RzEqPA-aRccFt_d_Ol85lXZAFhMc1qJKh0thiSS5L6txuofFSk1lAUscUNdLg5cAm_TfyXG0baFQtzXLhBU303PyVuBtqtOlSoPjYWDOrdfbBrGHreMnegJve8VJBspqgRa7SFaC4ODdlPWO_lp8bky7kcd6g8OOW8yneirQp3Z9BbdKd2aSqamUZwLflyDt4T3-xp0"
               alt="Abstract background">
        </div>

        <div class="hero-content">
          <span class="hero-badge">The Future of Digital Agency</span>
          <h1 class="hero-title">
            Scale your digital presence with <span class="hero-title-accent">AI-driven</span> marketing agents
          </h1>
          <p class="hero-subtitle">
            Automate your content strategy across Social Media with high-fidelity creative generation.
          </p>
          <div class="hero-buttons">
            <a routerLink="/catalog" class="hero-btn hero-btn-primary">Get Started</a>
            <button class="hero-btn hero-btn-secondary">Watch Demo</button>
          </div>
        </div>
      </section>

      <!-- Featured Agents Section -->
      <section class="section-base bg-surface">
        <div class="section-container">
          <div class="section-header">
            <h2 class="section-title">Featured AI Agents</h2>
            <div class="section-accent"></div>
          </div>

          <div class="bento-grid">
            @for (service of featuredServices(); track service.id; let i = $index) {
              @if (i === 0) {
                <!-- Large Card -->
                <div class="bento-card bento-card-large">
                  <div class="bento-card-content">
                    <div>
                      <div class="bento-card-icon-wrapper">
                        <div class="bento-card-icon">
                          <span class="material-symbols-outlined">{{ getIcon(service.platform[0]) }}</span>
                        </div>
                        <div>
                          <h3 class="bento-card-title">{{ service.name }}</h3>
                          <p class="bento-card-subtitle">{{ service.platform.join(' • ') }}</p>
                        </div>
                      </div>
                      <p class="bento-card-description">{{ service.shortDescription }}</p>
                    </div>
                    <a [routerLink]="['/details']" [queryParams]="{id: service.id}" class="bento-card-link">
                      View Details
                      <span class="material-symbols-outlined">arrow_forward</span>
                    </a>
                  </div>
                  <img class="bento-card-image" [src]="service.image" alt="">
                </div>
              } @else {
                <!-- Small Card -->
                <div class="bento-card bento-card-small">
                  <div class="bento-card-small-icon">
                    <span class="material-symbols-outlined">{{ getIcon(service.platform[0]) }}</span>
                  </div>
                  <h3 class="bento-card-small-title">{{ service.name }}</h3>
                  <p class="bento-card-small-description">{{ service.shortDescription }}</p>
                  <span class="bento-card-status" [class.active]="service.statusType === 'active'" [class.coming]="service.statusType === 'coming'">{{ service.status }}</span>
                </div>
              }
            }
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="section-base timeline-section">
        <div class="section-container">
          <div class="timeline-header">
            <p class="timeline-label">Implementation Protocol</p>
            <h2 class="timeline-title">How it Works</h2>
          </div>

          <div class="timeline-grid">
            <div class="timeline-step">
              <span class="timeline-phase">PHASE 01</span>
              <h4 class="timeline-step-title">Select Agent</h4>
              <p class="timeline-step-description">
                Choose from our library of specialized marketing agents designed for specific platforms and goals.
              </p>
            </div>
            <div class="timeline-step">
              <span class="timeline-phase">PHASE 02</span>
              <h4 class="timeline-step-title">Input Brand Context</h4>
              <p class="timeline-step-description">
                Upload brand guidelines, tonal preferences, and objective data to align the AI with your identity.
              </p>
            </div>
            <div class="timeline-step">
              <span class="timeline-phase">PHASE 03</span>
              <h4 class="timeline-step-title">AI Generation</h4>
              <p class="timeline-step-description">
                Our agents construct high-fidelity creatives, copy, and strategies within seconds.
              </p>
            </div>
            <div class="timeline-step">
              <span class="timeline-phase">PHASE 04</span>
              <h4 class="timeline-step-title">Review & Launch</h4>
              <p class="timeline-step-description">
                Approve the generated assets or request refinements through our architectural dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="section-base cta-section">
        <div class="cta-card">
          <div class="cta-glow"></div>
          <div class="cta-content">
            <h2 class="cta-title">Ready to deploy your first AI marketing team?</h2>
            <a routerLink="/contact" class="cta-button">Get Started Now</a>
            <p class="cta-note">No credit card required for initial setup</p>
          </div>
        </div>
      </section>
    </main>
    <app-footer />
  `,
  styles: [`
    /* Hero Section */
    .hero-section {
      position: relative;
      min-height: 921px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: 1.5rem;
    }

    @media (min-width: 1024px) {
      .hero-section { padding: 3rem; }
    }

    .hero-bg {
      position: absolute;
      inset: 0;
      z-index: 0;
      overflow: hidden;
    }

    .hero-bg-image {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 120%;
      height: 120%;
      object-fit: cover;
      opacity: 0.2;
      pointer-events: none;
    }

    .hero-content {
      position: relative;
      z-index: 10;
      max-width: 64rem;
      text-align: center;
    }

    .hero-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: var(--surface-container-high);
      border: 1px solid var(--outline-variant);
      font-size: 0.625rem;
      letter-spacing: 0.2em;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--primary);
      margin-bottom: 2rem;
    }

    .hero-title {
      font-size: 2.5rem;
      font-weight: 800;
      letter-spacing: -0.025em;
      line-height: 1.1;
      color: var(--on-surface);
      margin-bottom: 1.5rem;
    }

    @media (min-width: 768px) {
      .hero-title { font-size: 3.75rem; }
    }

    .hero-title-accent {
      color: var(--primary);
      font-style: italic;
    }

    .hero-subtitle {
      font-size: 1.125rem;
      color: var(--on-surface-variant);
      max-width: 42rem;
      margin: 0 auto 2.5rem;
      font-weight: 300;
      line-height: 1.6;
    }

    @media (min-width: 768px) {
      .hero-subtitle { font-size: 1.25rem; }
    }

    .hero-buttons {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }

    @media (min-width: 640px) {
      .hero-buttons { flex-direction: row; }
    }

    .hero-btn {
      width: 100%;
      padding: 1rem 2.5rem;
      font-size: 0.875rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      border-radius: var(--radius-lg);
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
    }

    @media (min-width: 640px) {
      .hero-btn { width: auto; }
    }

    .hero-btn-primary {
      background: var(--primary);
      color: var(--on-primary);
      border: none;
    }

    .hero-btn-primary:hover {
      filter: brightness(1.1);
    }

    .hero-btn-secondary {
      background: var(--surface-container-low);
      color: var(--on-surface);
      border: 1px solid var(--outline-variant);
    }

    .hero-btn-secondary:hover {
      background: var(--surface-container-high);
    }

    .hero-btn:active {
      transform: scale(0.95);
    }

    /* Section Base */
    .section-base {
      padding: 6rem 1.5rem;
    }

    @media (min-width: 1024px) {
      .section-base { padding: 6rem 3rem; }
    }

    .section-container {
      max-width: 80rem;
      margin: 0 auto;
    }

    .bg-surface {
      background: var(--surface);
    }

    /* Section Header */
    .section-header {
      margin-bottom: 4rem;
    }

    .section-title {
      font-size: 1.875rem;
      font-weight: 700;
      letter-spacing: -0.025em;
      margin-bottom: 0.5rem;
      color: var(--on-surface);
    }

    .section-accent {
      height: 4px;
      width: 80px;
      background: var(--primary);
    }

    /* Bento Grid */
    .bento-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    @media (min-width: 768px) {
      .bento-grid { grid-template-columns: repeat(3, 1fr); }
    }

    .bento-card {
      background: var(--surface-container-high);
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-xl);
      padding: 2rem;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
    }

    .bento-card:hover {
      border-color: var(--primary);
      box-shadow: 0 0 20px rgba(180, 197, 255, 0.15);
    }

    .bento-card-large {
      grid-column: span 1;
      position: relative;
      overflow: hidden;
    }

    @media (min-width: 768px) {
      .bento-card-large { grid-column: span 2; }
    }

    .bento-card-content {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
    }

    .bento-card-icon-wrapper {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }

    .bento-card-icon {
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--surface-container-lowest);
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-lg);
    }

    .bento-card-icon .material-symbols-outlined {
      font-size: 1.5rem;
      color: var(--primary);
    }

    .bento-card-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--on-surface);
    }

    .bento-card-subtitle {
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #64748b;
    }

    .bento-card-description {
      font-size: 1rem;
      color: var(--on-surface-variant);
      line-height: 1.6;
      margin-bottom: 1.5rem;
      max-width: 28rem;
    }

    .bento-card-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--primary);
      cursor: pointer;
      transition: gap 0.2s ease;
      text-decoration: none;
    }

    .bento-card-link:hover {
      gap: 1rem;
    }

    .bento-card-link .material-symbols-outlined {
      font-size: 1rem;
    }

    .bento-card-image {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 50%;
      opacity: 0.4;
      transition: transform 0.7s ease;
    }

    .bento-card:hover .bento-card-image {
      transform: scale(1.1);
    }

    .bento-card-small {
      min-height: 14rem;
    }

    .bento-card-small-icon {
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--surface-container-lowest);
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-lg);
      margin-bottom: 1.5rem;
    }

    .bento-card-small-icon .material-symbols-outlined {
      font-size: 1.25rem;
      color: var(--primary);
    }

    .bento-card-small-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--on-surface);
      margin-bottom: 0.75rem;
    }

    .bento-card-small-description {
      font-size: 0.875rem;
      color: var(--on-surface-variant);
      line-height: 1.5;
    }

    .bento-card-status {
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-top: auto;
      padding-top: 1.5rem;
    }

    .bento-card-status.active {
      color: var(--primary);
    }

    .bento-card-status.coming {
      color: #64748b;
    }

    /* Timeline */
    .timeline-section {
      background: var(--surface-container-low);
    }

    .timeline-header {
      text-align: center;
      margin-bottom: 5rem;
    }

    .timeline-label {
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.4em;
      text-transform: uppercase;
      color: #64748b;
      margin-bottom: 1rem;
    }

    .timeline-title {
      font-size: 2.25rem;
      font-weight: 700;
      letter-spacing: -0.025em;
      color: var(--on-surface);
    }

    .timeline-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0;
      position: relative;
      border-left: 1px solid var(--outline-variant);
    }

    @media (min-width: 1024px) {
      .timeline-grid {
        grid-template-columns: repeat(4, 1fr);
        border-left: none;
        border-top: 1px solid var(--outline-variant);
      }
    }

    .timeline-step {
      padding: 2rem;
      border-bottom: 1px solid var(--outline-variant);
      position: relative;
    }

    @media (min-width: 1024px) {
      .timeline-step {
        border-bottom: none;
        border-right: 1px solid var(--outline-variant);
      }
    }

    .timeline-step:last-child {
      border-bottom: none;
    }

    @media (min-width: 1024px) {
      .timeline-step:last-child { border-right: none; }
    }

    .timeline-phase {
      display: block;
      font-size: 0.625rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 1rem;
    }

    .timeline-step-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--on-surface);
      margin-bottom: 1rem;
    }

    .timeline-step-description {
      font-size: 0.875rem;
      color: var(--on-surface-variant);
      line-height: 1.6;
    }

    /* CTA Section */
    .cta-section {
      background: var(--surface);
    }

    .cta-card {
      max-width: 64rem;
      margin: 0 auto;
      background: var(--surface-container-highest);
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-xl);
      padding: 3rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    @media (min-width: 1024px) {
      .cta-card { padding: 5rem; }
    }

    .cta-glow {
      position: absolute;
      top: 0;
      right: 0;
      width: 16rem;
      height: 16rem;
      background: var(--primary);
      filter: blur(100px);
      opacity: 0.05;
      border-radius: 50%;
    }

    .cta-content {
      position: relative;
      z-index: 10;
    }

    .cta-title {
      font-size: 1.875rem;
      font-weight: 800;
      letter-spacing: -0.025em;
      line-height: 1.1;
      color: var(--on-surface);
      margin-bottom: 2rem;
    }

    @media (min-width: 1024px) {
      .cta-title { font-size: 3rem; }
    }

    .cta-button {
      display: inline-block;
      padding: 1rem 3rem;
      background: var(--primary);
      color: var(--on-primary);
      font-size: 1rem;
      font-weight: 700;
      border-radius: var(--radius-lg);
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .cta-button:hover {
      transform: scale(1.02);
      filter: brightness(1.1);
    }

    .cta-button:active {
      transform: scale(0.98);
    }

    .cta-note {
      margin-top: 2rem;
      font-size: 0.625rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #64748b;
    }
  `]
})
export class Landing {
  featuredServices = computed(() => getFeaturedServices());
  
  getIcon(platform: string): string {
    const icons: Record<string, string> = {
      'TikTok': 'smart_toy',
      'Instagram': 'photo_camera',
      'LinkedIn': 'psychology',
      'Shorts': 'smart_toy',
      'Blog': 'article',
      'Website': 'language',
      'Meta': 'campaign',
      'Google': 'search',
      'Community': 'forum',
      'Analytics': 'monitoring'
    };
    return icons[platform] || 'smart_toy';
  }
}