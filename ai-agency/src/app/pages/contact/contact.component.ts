import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../shared/components/navbar.component';
import { Footer } from '../../shared/components/footer.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, Navbar, Footer],
  template: `
    <app-navbar />
    
    <section class="contact-section">
      <div class="contact-container">
        <!-- Header -->
        <header class="contact-header">
          <span class="contact-badge">Get in Touch</span>
          <h1 class="contact-title">Start Your AI Transformation</h1>
          <p class="contact-subtitle">
            Ready to revolutionize your marketing? Let's discuss how our AI agents can automate your content strategy.
          </p>
        </header>

        <!-- Content Grid -->
        <div class="contact-grid">
          <!-- Form -->
          <div class="contact-form-wrapper">
            <form class="contact-form" (ngSubmit)="onSubmit()">
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">First Name</label>
                  <input type="text" id="firstName" [(ngModel)]="formData.firstName" name="firstName" required>
                </div>
                <div class="form-group">
                  <label for="lastName">Last Name</label>
                  <input type="text" id="lastName" [(ngModel)]="formData.lastName" name="lastName" required>
                </div>
              </div>

              <div class="form-group">
                <label for="email">Work Email</label>
                <input type="email" id="email" [(ngModel)]="formData.email" name="email" required>
              </div>

              <div class="form-group">
                <label for="company">Company</label>
                <input type="text" id="company" [(ngModel)]="formData.company" name="company">
              </div>

              <div class="form-group">
                <label for="service">Service Interested In</label>
                <select id="service" [(ngModel)]="formData.service" name="service">
                  <option value="">Select a service...</option>
                  <option value="viral-reels-creator">Viral Reels Creator</option>
                  <option value="copywriter-pro">Copywriter Pro</option>
                  <option value="thought-leader-ghostwriter">Thought Leader Ghostwriter</option>
                  <option value="aesthetic-curator">Aesthetic Curator</option>
                  <option value="ad-copy-optimizer">Ad-Copy Optimizer</option>
                  <option value="comment-engine-ai">Comment Engine AI</option>
                  <option value="trend-prediction-model">Trend Prediction Model</option>
                  <option value="strategy-bot">Strategy Bot</option>
                  <option value="custom">Custom Solution</option>
                </select>
              </div>

              <div class="form-group">
                <label for="message">Tell us about your project</label>
                <textarea id="message" [(ngModel)]="formData.message" name="message" rows="4"></textarea>
              </div>

              <button type="submit" class="btn btn-primary" [disabled]="isSubmitting()">
                {{ isSubmitting() ? 'Sending...' : 'Send Message' }}
              </button>

              @if (submitted()) {
                <div class="success-message">
                  <span class="material-symbols-outlined">check_circle</span>
                  <p>Thank you! We'll be in touch within 24 hours.</p>
                </div>
              }
            </form>
          </div>

          <!-- Info -->
          <div class="contact-info">
            <div class="info-card">
              <h3>Why Choose Aetheris AI?</h3>
              <ul>
                <li>
                  <span class="material-symbols-outlined">speed</span>
                  <div>
                    <strong>Lightning Fast</strong>
                    <p>Generate high-fidelity creatives in seconds, not hours.</p>
                  </div>
                </li>
                <li>
                  <span class="material-symbols-outlined">psychology</span>
                  <div>
                    <strong>Brand-Aligned</strong>
                    <p>Every output matches your unique brand voice and guidelines.</p>
                  </div>
                </li>
                <li>
                  <span class="material-symbols-outlined">insights</span>
                  <div>
                    <strong>Data-Driven</strong>
                    <p>Our agents learn from real-time performance metrics.</p>
                  </div>
                </li>
                <li>
                  <span class="material-symbols-outlined">support_agent</span>
                  <div>
                    <strong>24/7 Support</strong>
                    <p>Dedicated engineering team for custom integrations.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="info-card">
              <h3>Contact Info</h3>
              <ul>
                <li>
                  <span class="material-symbols-outlined">email</span>
                  <span>hello@aetheris.ai</span>
                </li>
                <li>
                  <span class="material-symbols-outlined">language</span>
                  <span>aetheris.ai</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <app-footer />
  `,
  styles: [`
    .contact-section {
      padding-top: 6rem;
      padding-bottom: 5rem;
      min-height: 100vh;
    }

    .contact-container {
      max-width: 80rem;
      margin: 0 auto;
      padding: 0 2rem;
    }

    /* Header */
    .contact-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .contact-badge {
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--primary);
      margin-bottom: 1rem;
      display: block;
    }

    .contact-title {
      font-size: 2.5rem;
      font-weight: 900;
      letter-spacing: -0.025em;
      color: var(--on-surface);
      margin-bottom: 1rem;
    }

    @media (min-width: 768px) {
      .contact-title { font-size: 3.5rem; }
    }

    .contact-subtitle {
      font-size: 1rem;
      color: var(--on-surface-variant);
      max-width: 32rem;
      margin: 0 auto;
      line-height: 1.6;
    }

    /* Content Grid */
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    @media (min-width: 1024px) {
      .contact-grid {
        grid-template-columns: repeat(12, 1fr);
      }
    }

    /* Form */
    .contact-form-wrapper {
      @media (min-width: 1024px) {
        grid-column: span 7;
      }
    }

    .contact-form {
      background: var(--surface-container-high);
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-xl);
      padding: 2rem;
    }

    @media (min-width: 768px) {
      .contact-form { padding: 3rem; }
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    @media (min-width: 640px) {
      .form-row { grid-template-columns: repeat(2, 1fr); }
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--on-surface);
      margin-bottom: 0.5rem;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 0.875rem 1rem;
      background: var(--surface-container-lowest);
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-md);
      color: var(--on-surface);
      font-size: 0.875rem;
      transition: border-color 0.2s ease;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--primary);
    }

    .form-group textarea {
      resize: vertical;
    }

    .btn {
      width: 100%;
      padding: 1rem 1.5rem;
      font-size: 0.875rem;
      font-weight: 700;
      border-radius: var(--radius-lg);
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
    }

    .btn-primary {
      background: var(--primary);
      color: var(--on-primary);
    }

    .btn-primary:hover:not(:disabled) {
      filter: brightness(1.1);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .success-message {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.3);
      border-radius: var(--radius-md);
      margin-top: 1.5rem;
    }

    .success-message .material-symbols-outlined {
      color: #22c55e;
    }

    .success-message p {
      font-size: 0.875rem;
      color: #22c55e;
    }

    /* Info */
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    @media (min-width: 1024px) {
      .contact-info { grid-column: span 5; }
    }

    .info-card {
      background: var(--surface-container-high);
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-xl);
      padding: 2rem;
    }

    .info-card h3 {
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--primary);
      margin-bottom: 1.5rem;
    }

    .info-card ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .info-card li {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }

    .info-card li .material-symbols-outlined {
      font-size: 1.25rem;
      color: var(--primary);
      margin-top: 0.25rem;
    }

    .info-card li strong {
      display: block;
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--on-surface);
      margin-bottom: 0.25rem;
    }

    .info-card li p {
      font-size: 0.75rem;
      color: var(--on-surface-variant);
      line-height: 1.5;
    }

    .info-card li > span {
      font-size: 0.875rem;
      color: var(--on-surface);
    }
  `]
})
export class Contact {
  isSubmitting = signal(false);
  submitted = signal(false);
  
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    service: '',
    message: ''
  };
  
  onSubmit(): void {
    this.isSubmitting.set(true);
    
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitted.set(true);
    }, 1500);
  }
}