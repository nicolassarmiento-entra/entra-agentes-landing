import { Component, input, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Service } from '../../core/data/services.data';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'catalog-card'
  },
  template: `
    <div class="catalog-card-header">
      <div class="catalog-card-icon">
        <span class="material-symbols-outlined">{{ getIcon() }}</span>
      </div>
      <span class="catalog-card-platform">{{ service().platform[0] }}</span>
    </div>
    <h3 class="catalog-card-title">{{ service().name }}</h3>
    <p class="catalog-card-description">{{ service().shortDescription }}</p>
    <div class="catalog-card-actions">
      <a [routerLink]="['/details']" [queryParams]="{id: service().id}" class="catalog-card-button primary">
        <span>View Details</span>
        <span class="material-symbols-outlined">arrow_forward</span>
      </a>
      <button 
        class="catalog-card-button favorite" 
        [class.active]="isFavorite()"
        (click)="toggleFav($event)"
        [title]="isFavorite() ? 'Remove from favorites' : 'Add to favorites'">
        <span class="material-symbols-outlined">{{ isFavorite() ? 'favorite' : 'favorite_border' }}</span>
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background: rgba(28, 42, 65, 0.4);
      backdrop-filter: blur(8px);
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-xl);
      padding: 2rem;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    :host:hover {
      border-color: var(--primary);
      box-shadow: 0 0 20px rgba(180, 197, 255, 0.15);
      transform: translateY(-2px);
    }

    .catalog-card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.5rem;
    }

    .catalog-card-icon {
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--surface-container-highest);
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-lg);
      transition: border-color 0.2s ease;
    }

    :host:hover .catalog-card-icon {
      border-color: rgba(180, 197, 255, 0.5);
    }

    .catalog-card-icon .material-symbols-outlined {
      font-size: 1.5rem;
      color: var(--primary);
      font-variation-settings: 'FILL' 1;
    }

    .catalog-card-platform {
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 0.25rem 0.5rem;
      background: var(--surface-container-highest);
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-default);
      color: var(--on-surface);
    }

    .catalog-card-title {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.025em;
      color: var(--on-surface);
      margin-bottom: 0.75rem;
    }

    .catalog-card-description {
      font-size: 0.875rem;
      color: var(--on-surface-variant);
      line-height: 1.6;
      margin-bottom: 1.5rem;
      flex: 1;
    }

    .catalog-card-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: auto;
    }

    .catalog-card-button {
      padding: 0.75rem 1rem;
      background: transparent;
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-md);
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--on-surface);
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      text-decoration: none;
    }

    .catalog-card-button:hover {
      background: var(--primary);
      border-color: var(--primary);
      color: var(--on-primary);
    }

    .catalog-card-button:active {
      transform: scale(0.98);
    }

    .catalog-card-button .material-symbols-outlined {
      font-size: 1rem;
    }

    .catalog-card-button.primary {
      flex: 1;
      background: transparent;
    }

    .catalog-card-button.favorite {
      flex: none;
      padding: 0.75rem;
    }

    .catalog-card-button.favorite:hover {
      background: var(--surface-bright);
      border-color: var(--outline-variant);
      color: #ef4444;
    }

    .catalog-card-button.favorite .material-symbols-outlined {
      font-variation-settings: 'FILL' 0;
    }

    .catalog-card-button.favorite.active .material-symbols-outlined {
      font-variation-settings: 'FILL' 1;
      color: #ef4444;
    }
  `]
})
export class ServiceCard {
  service = input.required<Service>();
  private favoritesService = inject(FavoritesService);
  
  isFavorite = () => this.favoritesService.isFavorite(this.service().id);
  
  getIcon(): string {
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
    return icons[this.service().platform[0]] || 'smart_toy';
  }
  
  toggleFav(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favoritesService.toggle(this.service().id);
  }
}