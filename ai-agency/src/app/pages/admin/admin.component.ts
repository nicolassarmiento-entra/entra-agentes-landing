import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../shared/components/navbar.component';
import { Footer } from '../../shared/components/footer.component';
import { services, Service, addService, removeService, getServices } from '../../core/data/services.data';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, RouterLink, Navbar, Footer],
  template: `
    <app-navbar />
    
    <section class="admin-section">
      <div class="admin-container">
        <!-- Header -->
        <header class="admin-header">
          <div class="admin-header-left">
            <span class="admin-badge">Admin Panel</span>
            <h1 class="admin-title">Dashboard</h1>
          </div>
          <div class="admin-header-right">
            <span class="stat">
              <span class="stat-value">{{ totalServices() }}</span>
              <span class="stat-label">Total Agents</span>
            </span>
            <span class="stat">
              <span class="stat-value">{{ favoritesCount() }}</span>
              <span class="stat-label">Saved</span>
            </span>
            <span class="stat">
              <span class="stat-value">{{ activeAgents() }}</span>
              <span class="stat-label">Active</span>
            </span>
          </div>
        </header>

        <!-- Stats Grid -->
        <div class="admin-stats">
          <div class="stat-card">
            <div class="stat-card-icon">
              <span class="material-symbols-outlined">smart_toy</span>
            </div>
            <div class="stat-card-content">
              <span class="stat-card-value">{{ totalServices() }}</span>
              <span class="stat-card-label">Total Agents</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-card-icon">
              <span class="material-symbols-outlined">favorite</span>
            </div>
            <div class="stat-card-content">
              <span class="stat-card-value">{{ favoritesCount() }}</span>
              <span class="stat-card-label">Favorites</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-card-icon">
              <span class="material-symbols-outlined">check_circle</span>
            </div>
            <div class="stat-card-content">
              <span class="stat-card-value">{{ activeAgents() }}</span>
              <span class="stat-card-label">Active Agents</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-card-icon">
              <span class="material-symbols-outlined">hourglass_empty</span>
            </div>
            <div class="stat-card-content">
              <span class="stat-card-value">{{ comingSoon() }}</span>
              <span class="stat-card-label">Coming Soon</span>
            </div>
          </div>
        </div>

        <!-- Create Service Form -->
        <div class="crud-section">
          <h2 class="section-title">Crear Nuevo Servicio</h2>
          <form class="crud-form" (ngSubmit)="createService()">
            <div class="form-row">
              <div class="form-group">
                <label for="name">Nombre del Servicio</label>
                <input type="text" id="name" [(ngModel)]="newService.name" name="name" required placeholder="ej: AI Chatbot">
              </div>
              <div class="form-group">
                <label for="category">Categoría</label>
                <select id="category" [(ngModel)]="newService.category" name="category" required>
                  <option value="">Seleccionar...</option>
                  <option value="Video">Video</option>
                  <option value="Copy">Copy</option>
                  <option value="Static">Static</option>
                  <option value="Multi-Channel">Multi-Channel</option>
                  <option value="Community">Community</option>
                  <option value="Analytics">Analytics</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="shortDescription">Descripción Breve</label>
              <input type="text" id="shortDescription" [(ngModel)]="newService.shortDescription" name="shortDescription" required placeholder="Breve descripción del servicio">
            </div>
            <div class="form-group">
              <label for="fullDescription">Descripción Completa</label>
              <textarea id="fullDescription" [(ngModel)]="newService.fullDescription" name="fullDescription" required rows="3" placeholder="Descripción completa del servicio"></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="platform">Plataforma (separadas por coma)</label>
                <input type="text" id="platform" [(ngModel)]="platformInput" name="platform" required placeholder="ej: TikTok, Instagram">
              </div>
              <div class="form-group">
                <label for="statusType">Estado</label>
                <select id="statusType" [(ngModel)]="newService.statusType" name="statusType" required>
                  <option value="active">Activo</option>
                  <option value="beta">Beta</option>
                  <option value="coming">Próximamente</option>
                </select>
              </div>
            </div>
            <button type="submit" class="btn btn-primary" [disabled]="isCreating()">
              {{ isCreating() ? 'Creando...' : 'Crear Servicio' }}
            </button>
            @if (message()) {
              <div class="message" [class.success]="messageType() === 'success'" [class.error]="messageType() === 'error'">
                {{ message() }}
              </div>
            }
          </form>
        </div>

        <!-- Services Table -->
        <div class="admin-table-wrapper">
          <h2 class="table-title">Todos los Agentes</h2>
          <div class="table-filters">
            <input 
              type="text" 
              placeholder="Buscar agentes..." 
              [(ngModel)]="searchQuery"
              class="table-search">
          </div>
          
          <table class="admin-table">
            <thead>
              <tr>
                <th>Agente</th>
                <th>Categoría</th>
                <th>Plataforma</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              @for (service of filteredServices(); track service.id) {
                <tr>
                  <td>
                    <div class="agent-cell">
                      <span class="agent-name">{{ service.name }}</span>
                      <span class="agent-desc">{{ service.shortDescription }}</span>
                    </div>
                  </td>
                  <td>
                    <span class="category-badge">{{ service.category }}</span>
                  </td>
                  <td>
                    <span class="platform-badge">{{ service.platform.join(', ') }}</span>
                  </td>
                  <td>
                    <span class="status-badge" [class.active]="service.statusType === 'active'" [class.coming]="service.statusType === 'coming'" [class.beta]="service.statusType === 'beta'">
                      {{ service.status }}
                    </span>
                  </td>
                  <td>
                    <div class="action-buttons">
                      <a [routerLink]="['/details']" [queryParams]="{id: service.id}" class="action-btn" title="Ver Detalles">
                        <span class="material-symbols-outlined">visibility</span>
                      </a>
                      <button 
                        class="action-btn" 
                        [class.active]="isFavorite(service.id)"
                        (click)="toggleFavorite(service.id)"
                        [title]="isFavorite(service.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'">
                        <span class="material-symbols-outlined">{{ isFavorite(service.id) ? 'favorite' : 'favorite_border' }}</span>
                      </button>
                      <button class="action-btn delete" (click)="deleteService(service.id)" title="Eliminar">
                        <span class="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <app-footer />
  `,
  styles: [`
    .admin-section {
      padding-top: 6rem;
      padding-bottom: 5rem;
      min-height: 100vh;
    }

    .admin-container {
      max-width: 80rem;
      margin: 0 auto;
      padding: 0 2rem;
    }

    /* Header */
    .admin-header {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    @media (min-width: 768px) {
      .admin-header {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
      }
    }

    .admin-header-left {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .admin-badge {
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--primary);
    }

    .admin-title {
      font-size: 2.5rem;
      font-weight: 900;
      letter-spacing: -0.025em;
      color: var(--on-surface);
    }

    @media (min-width: 768px) {
      .admin-title { font-size: 3rem; }
    }

    .admin-header-right {
      display: flex;
      gap: 2rem;
    }

    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--on-surface);
    }

    .stat-label {
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--on-surface-variant);
    }

    /* Stats Grid */
    .admin-stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-bottom: 3rem;
    }

    @media (min-width: 768px) {
      .admin-stats {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .stat-card {
      background: var(--surface-container-high);
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-xl);
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .stat-card-icon {
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--surface-container-lowest);
      border-radius: var(--radius-lg);
    }

    .stat-card-icon .material-symbols-outlined {
      font-size: 1.5rem;
      color: var(--primary);
    }

    .stat-card-content {
      display: flex;
      flex-direction: column;
    }

    .stat-card-value {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--on-surface);
    }

    .stat-card-label {
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--on-surface-variant);
    }

    /* CRUD Section */
    .crud-section {
      background: var(--surface-container-high);
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-xl);
      padding: 2rem;
      margin-bottom: 3rem;
    }

    .section-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--on-surface);
      margin-bottom: 1.5rem;
    }

    .crud-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
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
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--on-surface);
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: 0.75rem 1rem;
      background: var(--surface-container-lowest);
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-md);
      color: var(--on-surface);
      font-size: 0.875rem;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--primary);
    }

    .btn {
      padding: 0.75rem 1.5rem;
      font-size: 0.75rem;
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

    .message {
      padding: 0.75rem 1rem;
      border-radius: var(--radius-md);
      font-size: 0.875rem;
    }

    .message.success {
      background: rgba(34, 197, 94, 0.1);
      color: #22c55e;
    }

    .message.error {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }

    /* Table */
    .admin-table-wrapper {
      background: var(--surface-container-high);
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-xl);
      padding: 2rem;
    }

    .table-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--on-surface);
      margin-bottom: 1.5rem;
    }

    .table-filters {
      margin-bottom: 1.5rem;
    }

    .table-search {
      padding: 0.625rem 1rem;
      background: var(--surface-container-lowest);
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-md);
      color: var(--on-surface);
      font-size: 0.875rem;
      width: 100%;
      max-width: 16rem;
    }

    .table-search:focus {
      outline: none;
      border-color: var(--primary);
    }

    .admin-table {
      width: 100%;
      border-collapse: collapse;
    }

    .admin-table th {
      text-align: left;
      padding: 1rem;
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--on-surface-variant);
      border-bottom: 1px solid var(--outline-variant);
    }

    .admin-table td {
      padding: 1rem;
      border-bottom: 1px solid var(--outline-variant);
    }

    .agent-cell {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .agent-name {
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--on-surface);
    }

    .agent-desc {
      font-size: 0.75rem;
      color: var(--on-surface-variant);
      max-width: 20rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .category-badge,
    .platform-badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      background: var(--surface-container-lowest);
      border-radius: var(--radius-default);
    }

    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      border-radius: var(--radius-default);
    }

    .status-badge.active {
      background: rgba(34, 197, 94, 0.1);
      color: #22c55e;
    }

    .status-badge.coming {
      background: rgba(100, 116, 139, 0.1);
      color: #64748b;
    }

    .status-badge.beta {
      background: rgba(180, 197, 255, 0.1);
      color: var(--primary);
    }

    .action-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .action-btn {
      padding: 0.5rem;
      background: transparent;
      border: 1px solid var(--outline-variant);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .action-btn:hover {
      background: var(--surface-bright);
    }

    .action-btn.delete:hover {
      background: rgba(239, 68, 68, 0.1);
      border-color: #ef4444;
    }

    .action-btn.delete:hover .material-symbols-outlined {
      color: #ef4444;
    }

    .action-btn.active .material-symbols-outlined {
      color: #ef4444;
      font-variation-settings: 'FILL' 1;
    }

    .action-btn .material-symbols-outlined {
      font-size: 1rem;
      color: var(--on-surface-variant);
    }
  `]
})
export class Admin {
  searchQuery = '';
  platformInput = '';
  private favoritesService = inject(FavoritesService);
  
  // Form state
  isCreating = signal(false);
  message = signal('');
  messageType = signal<'success' | 'error'>('success');
  
  newService = {
    name: '',
    shortDescription: '',
    fullDescription: '',
    category: '',
    statusType: 'active' as const,
    featured: false
  };

  // Stats using computed
  totalServices = computed(() => services().length);
  favoritesCount = () => this.favoritesService.count();
  activeAgents = computed(() => services().filter(s => s.statusType === 'active').length);
  comingSoon = computed(() => services().filter(s => s.statusType === 'coming').length);
  
  filteredServices = () => {
    const q = this.searchQuery.toLowerCase();
    if (!q) return services();
    return services().filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.category.toLowerCase().includes(q)
    );
  };
  
  isFavorite = (id: string) => this.favoritesService.isFavorite(id);
  
  toggleFavorite(id: string): void {
    this.favoritesService.toggle(id);
  }
  
  createService(): void {
    if (!this.newService.name || !this.newService.shortDescription || !this.newService.fullDescription || !this.newService.category || !this.platformInput) {
      this.message.set('Por favor complete todos los campos');
      this.messageType.set('error');
      return;
    }
    
    this.isCreating.set(true);
    
    try {
      const platforms = this.platformInput.split(',').map(p => p.trim()).filter(p => p);
      
      addService({
        name: this.newService.name,
        shortDescription: this.newService.shortDescription,
        fullDescription: this.newService.fullDescription,
        platform: platforms,
        platformIcon: 'smart_toy',
        deliverables: ['Custom Deliverable'],
        steps: [
          { step: "01", title: "Setup", icon: "settings" },
          { step: "02", title: "Configure", icon: "tune" },
          { step: "03", title: "Deploy", icon: "rocket_launch" }
        ],
        testimonial: "New service added via admin panel.",
        status: this.newService.statusType === 'active' ? 'Active Agent' : this.newService.statusType === 'beta' ? 'Beta Access' : 'Coming Soon',
        statusType: this.newService.statusType,
        image: '',
        category: this.newService.category,
        featured: this.newService.featured
      });
      
      // Reset form
      this.newService = {
        name: '',
        shortDescription: '',
        fullDescription: '',
        category: '',
        statusType: 'active',
        featured: false
      };
      this.platformInput = '';
      
      this.message.set('Servicio creado exitosamente!');
      this.messageType.set('success');
    } catch (error) {
      this.message.set('Error al crear el servicio');
      this.messageType.set('error');
    } finally {
      this.isCreating.set(false);
    }
  }
  
  deleteService(id: string): void {
    if (confirm('¿Está seguro que desea eliminar este servicio?')) {
      const deleted = removeService(id);
      if (deleted) {
        this.message.set('Servicio eliminado exitosamente!');
        this.messageType.set('success');
      } else {
        this.message.set('Error al eliminar el servicio');
        this.messageType.set('error');
      }
    }
  }
}