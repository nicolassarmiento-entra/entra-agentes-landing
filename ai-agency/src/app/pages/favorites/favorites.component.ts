import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../shared/components/navbar.component';
import { Footer } from '../../shared/components/footer.component';
import { ServiceCard } from '../../shared/components/service-card.component';
import { services, Service } from '../../core/data/services.data';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RouterLink, Navbar, Footer, ServiceCard],
  template: `
    <app-navbar />
    
    <section class="favorites-section">
      <div class="favorites-container">
        <!-- Header -->
        <header class="favorites-header">
          <span class="favorites-label">Your Collection</span>
          <h1 class="favorites-title">Saved Agents</h1>
          <p class="favorites-count">{{ favoriteServices().length }} agent{{ favoriteServices().length === 1 ? '' : 's' }} saved</p>
        </header>

        <!-- Grid -->
        <div class="favorites-grid">
          @for (service of favoriteServices(); track service.id) {
            <app-service-card [service]="service" />
          } @empty {
            <div class="empty-state">
              <span class="material-symbols-outlined">favorite_border</span>
              <h2>No saved agents yet</h2>
              <p>Browse the catalog and save agents you'd like to revisit later.</p>
              <a routerLink="/catalog" class="btn btn-primary">Explore Catalog</a>
            </div>
          }
        </div>
      </div>
    </section>

    <app-footer />
  `,
  styles: [`
    .favorites-section {
      padding-top: 6rem;
      padding-bottom: 5rem;
      min-height: 100vh;
    }

    .favorites-container {
      max-width: 80rem;
      margin: 0 auto;
      padding: 0 2rem;
    }

    /* Header */
    .favorites-header {
      margin-bottom: 3rem;
    }

    .favorites-label {
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--primary);
      margin-bottom: 0.5rem;
    }

    .favorites-title {
      font-size: 2.5rem;
      font-weight: 900;
      letter-spacing: -0.025em;
      color: var(--on-surface);
    }

    @media (min-width: 768px) {
      .favorites-title { font-size: 3rem; }
    }

    .favorites-count {
      font-size: 0.875rem;
      color: #64748b;
      margin-top: 0.5rem;
    }

    /* Grid */
    .favorites-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    @media (min-width: 640px) {
      .favorites-grid { grid-template-columns: repeat(2, 1fr); }
    }

    @media (min-width: 1024px) {
      .favorites-grid { grid-template-columns: repeat(3, 1fr); }
    }

    /* Empty State */
    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 4rem 2rem;
      background: var(--surface-container-high);
      border: 1px dashed var(--outline-variant);
      border-radius: var(--radius-xl);
    }

    .empty-state .material-symbols-outlined {
      font-size: 4rem;
      color: var(--on-surface-variant);
      margin-bottom: 1rem;
    }

    .empty-state h2 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--on-surface);
      margin-bottom: 0.5rem;
    }

    .empty-state p {
      font-size: 0.875rem;
      color: var(--on-surface-variant);
      margin-bottom: 1.5rem;
    }

    .btn {
      padding: 0.625rem 1rem;
      font-size: 0.75rem;
      font-weight: 700;
      border-radius: var(--radius-lg);
      text-decoration: none;
      letter-spacing: 0.05em;
      transition: all 0.2s ease;
      display: inline-block;
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
export class Favorites {
  private favoritesService = inject(FavoritesService);

  favoriteServices = computed(() => {
    const favoriteIds = this.favoritesService.favorites();
    return services().filter((s: Service) => favoriteIds.includes(s.id));
  });
}