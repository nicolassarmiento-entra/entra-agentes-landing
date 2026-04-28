import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  host: {
    'class': 'navbar'
  },
  template: `
    <a routerLink="/" class="navbar-logo">Aetheris AI</a>
    <div class="navbar-links" id="nav-links">
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="navbar-link">Solutions</a>
      <a routerLink="/catalog" routerLinkActive="active" class="navbar-link">Agents</a>
      <a href="#" class="navbar-link">Case Studies</a>
      <a routerLink="/contact" routerLinkActive="active" class="navbar-link">Pricing</a>
      <a routerLink="/admin" routerLinkActive="active" class="navbar-link">Admin Panel</a>
    </div>
    <div class="navbar-right">
      <a routerLink="/favorites" class="navbar-link" title="Favorites" style="position: relative;">
        <span class="material-symbols-outlined">favorite</span>
        @if (favCount() > 0) {
          <span class="fav-badge">{{ favCount() }}</span>
        }
      </a>
      <a routerLink="/contact" class="btn btn-primary btn-sm">Get Started</a>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.5rem;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background: rgba(4, 19, 41, 0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--outline-variant);
    }

    .navbar-logo {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--primary);
      text-decoration: none;
      letter-spacing: -0.025em;
    }

    .navbar-links {
      display: none;
      gap: 2rem;
    }

    @media (min-width: 768px) {
      .navbar-links { display: flex; }
    }

    .navbar-link {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--on-surface-variant);
      text-decoration: none;
      transition: color 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .navbar-link:hover,
    .navbar-link.active {
      color: var(--on-surface);
    }

    .navbar-link.active {
      color: var(--primary);
    }

    .navbar-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .fav-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: var(--primary);
      color: var(--on-primary);
      font-size: 0.625rem;
      font-weight: 700;
      padding: 0.125rem 0.375rem;
      border-radius: 9999px;
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

    .btn-sm {
      padding: 0.5rem 0.75rem;
      font-size: 0.625rem;
    }
  `]
})
export class Navbar {
  private favoritesService = inject(FavoritesService);
  
  favCount = this.favoritesService.count;
}