import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  host: {
    'class': 'footer'
  },
  template: `
    <div class="footer-logo">Aetheris AI</div>
    <div class="footer-copyright">© 2024 Aetheris AI Digital. Architectural Precision.</div>
    <div class="footer-links">
      <a href="#" class="footer-link">Privacy Policy</a>
      <a href="#" class="footer-link">Terms of Service</a>
      <a href="#" class="footer-link">Security</a>
      <a href="#" class="footer-link">Status</a>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      padding: 3rem 1.5rem;
      background: var(--surface-container-low);
      border-top: 1px solid var(--outline-variant);
    }

    @media (min-width: 768px) {
      :host {
        flex-direction: row;
        justify-content: space-between;
      }
    }

    .footer-logo {
      font-size: 1rem;
      font-weight: 800;
      color: var(--primary);
    }

    .footer-copyright {
      font-size: 0.75rem;
      color: var(--on-surface-variant);
    }

    .footer-links {
      display: flex;
      gap: 1.5rem;
    }

    .footer-link {
      font-size: 0.75rem;
      color: var(--on-surface-variant);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .footer-link:hover {
      color: var(--on-surface);
    }
  `]
})
export class Footer {}