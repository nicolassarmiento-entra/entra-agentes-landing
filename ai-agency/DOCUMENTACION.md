# Documentación Técnica - Aetheris AI Landing (Angular)

## 1. Arquitectura General del Proyecto

### 1.1 Estructura de Carpetas

```
src/app/
├── core/
│   ├── data/
│   │   └── services.data.ts    # Datos de los agentes (con soporte CRUD)
│   └── services/
│       └── favorites.service.ts # Servicio para gestionar favoritos
├── pages/
│   ├── landing/               # Página principal (/)
│   ├── catalog/              # Catálogo de servicios (/catalog)
│   ├── details/             # Detalles del servicio (/details)
│   ├── favorites/          # Agentes guardados (/favorites)
│   ├── contact/            # Formulario de contacto (/contact)
│   └── admin/             # Panel de administración (/admin)
├── shared/
│   └── components/
│       ├── navbar.component.ts      # Barra de navegación
│       ├── footer.component.ts   # Pie de página
│       └── service-card.component.ts # Tarjeta de servicio reutilizable
├── app.config.ts           # Configuración de la aplicación
└── app.routes.ts        # Definición de rutas
```

### 1.2 Tecnologías Utilizadas

- **Angular v20+**: Framework principal con señales reactivas (Signals)
- **TypeScript**: lenguaje de programación tipado
- **Tailwind CSS**: Framework de estilos (ya instalado en el proyecto)
- **Standalone Components**: Componentes autónomos sin NgModules

---

## 2. Sistema de Favoritos

### 2.1 Descripción del Funcionamiento

El sistema de favoritos permite a los usuarios guardar agentes AI de su interés para posteriormente revisarlos. La implementación utiliza:

1. **FavoritesService** (`src/app/core/services/favorites.service.ts`)
2. **localStorage** del navegador para persistencia

### 2.2 Código del Servicio

```typescript
@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private storageKey = 'aetheris-favorites';
  
  // Signal reactivo que almacena los IDs de favoritos
  private _favorites = signal<string[]>([]);
  
  // Exposición de solo lectura
  readonly favorites = this._favorites.asReadonly();
  readonly count = computed(() => this._favorites().length);
  
  constructor() {
    // Cargar desde localStorage al iniciar
    this.loadFromStorage();
    
    // Efecto que sincroniza cambios con localStorage
    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this._favorites()));
    });
  }
  
  // Métodos públicos
  isFavorite(id: string): boolean { ... }
  toggle(id: string): void { ... }
  add(id: string): void { ... }
  remove(id: string): void { ... }
  clear(): void { ... }
}
```

### 2.3 Flujo de Funcionamiento

1. **Inicialización**: Al cargar la página, el servicio verifica si existe la clave `aetheris-favorites` en localStorage
2. **Carga**: Si existe, parsea el JSON y guarda los IDs en el signal `_favorites`
3. **Modificación**: Cuando el usuario hace clic en "favorito", el método `toggle()` añade o remueve el ID
4. **Persistencia**: El `effect()` detecta cualquier cambio en `_favorites` y guarda automáticamente en localStorage
5. **Sincronización**: En siguiente visita, los favoritos se restauran automáticamente

### 2.4 Ejemplo de Uso en Componente

```typescript
// Inyección del servicio
private favoritesService = inject(FavoritesService);

// Verificar si un servicio es favorito
isFavorite = () => this.favoritesService.isFavorite(service.id);

// Alternar favorita
toggleFav(): void {
  this.favoritesService.toggle(service.id);
}

// Mostrar contador en navbar
favCount = this.favoritesService.count;
```

---

## 3. Datos de los Agentes

### 3.1 Estructura de Datos

Los datos de los agentes están definidos en `src/app/core/data/services.data.ts`:

```typescript
export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  platform: string[];
  platformIcon: string;
  deliverables: string[];
  steps: { step: string; title: string; icon: string }[];
  testimonial: string;
  status: string;
  statusType: 'active' | 'coming' | 'beta';
  image: string;
  category: string;
  featured: boolean;
}
```

### 3.2 Agentes Disponibles (8 total)

| ID | Nombre | Plataforma | Estado |
|---|---|---|---|
| viral-reels-creator | Viral Reels Creator | TikTok, Instagram, Shorts | Activo |
| copywriter-pro | Copywriter Pro | LinkedIn, Blog, Website | Activo |
| thought-leader-ghostwriter | Thought Leader Ghostwriter | LinkedIn | Activo |
| aesthetic-curator | Aesthetic Curator | Instagram | Activo |
| ad-copy-optimizer | Ad-Copy Optimizer | Meta, Google | Activo |
| comment-engine-ai | Comment Engine AI | Community | Activo |
| trend-prediction-model | Trend Prediction Model | Analytics | Activo |
| strategy-bot | Strategy Bot | Multi-Channel | Próximamente |

### 3.3 Signal y Funciones de Datos

Los servicios usan un **signal reactivo** para permitir modificaciones en tiempo real (CRUD):

```typescript
// Signal principal - servicios como estado reactivo
export const services = signal<Service[]>(initialServices);

// Funciones helper
export const getServices = computed(() => services());
export function getServiceById(id: string): Service | undefined
export function getFeaturedServices(): Service[]
export function getServicesByCategory(category: string): Service[]
export function getServicesByPlatform(platform: string): Service[]
export function searchServices(query: string): Service[]

// === FUNCIONES CRUD ===

// Crear nuevo servicio (retorna el servicio creado)
export function addService(service: Omit<Service, 'id'>): Service

// Eliminar servicio (retorna true si éxito)
export function removeService(id: string): boolean

// Actualizar servicio (retorna true si éxito)
export function updateService(id: string, updates: Partial<Service>): boolean
```

### 3.4 Cómo Importar en Componentes

```typescript
// ❌ INCORRECTO - ya no existe SERVICES como export
import { SERVICES, Service } from '...';

// ✅ CORRECTO - usar services (signal) y las funciones
import { services, Service, getServiceById } from '...';

// Ejemplo de uso en componente:
export class Catalog {
  // Leer servicios
  allServices = services();
  
  // En computed
  filteredServices = computed(() => {
    return services().filter(s => s.category === 'Video');
  });
  
  // En template
  // @for (service of services(); track service.id) { ... }
}
```

### 3.5 Persistencia de Datos

> **Nota importante**: Los datos de los agentes están **embebidos directamente en el código** (hardcoded). No proviene de una API externa ni de una base de datos. Esto es una **limitación del prototype** y puede mejorarse en futuras iteraciones conectando a un backend real.

---

## 4. Sistema de Rutas

### 4.1 Definición de Rutas

El archivo `src/app/app.routes.ts` define todas las rutas de la aplicación:

```typescript
export const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { 
    path: '', 
    loadComponent: () => import('./pages/landing/landing.component').then(m => m.Landing) 
  },
  { 
    path: 'catalog', 
    loadComponent: () => import('./pages/catalog/catalog.component').then(m => m.Catalog) 
  },
  { 
    path: 'details', 
    loadComponent: () => import('./pages/details/details.component').then(m => m.Details) 
  },
  { 
    path: 'favorites', 
    loadComponent: () => import('./pages/favorites/favorites.component').then(m => m.Favorites) 
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.Contact) 
  },
  { 
    path: 'admin', 
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.Admin) 
  },
  { 
    path: '**', 
    loadComponent: () => import('./pages/landing/landing.component').then(m => m.Landing) 
  }
];
```

### 4.2 Navegación entre Páginas

| Ruta | Componente | Página | Descripción |
|---|---|---|---|
| `/` | Landing | Inicio | Página principal con Hero, agentes destacados, timeline |
| `/catalog` | Catalog | Catálogo | Lista de todos los agentes con filtros |
| `/details?id=X` | Details | Detalles | Información detallada de un agente específico |
| `/favorites` | Favorites | Favoritos | Lista de agentes guardados |
| `/contact` | Contact | Contacto | Formulario de contacto |
| `/admin` | Admin | Admin | Panel de administración con CRUD |

### 4.3 Parámetros de Ruta

**Página Details**: Utiliza query parameter para mostrar el agente seleccionado.

```typescript
// URL ejemplo: /details?id=viral-reels-creator
// En el componente:
serviceId = signal<string>('');

constructor() {
  this.route.queryParams.subscribe(params => {
    this.serviceId.set(params['id'] || 'viral-reels-creator');
  });
}
```

### 4.4 Lazy Loading

Todas las páginas utilizan **carga diferida (lazy loading)**:

```typescript
{ 
  path: 'catalog', 
  loadComponent: () => import('./pages/catalog/catalog.component').then(m => m.Catalog) 
}
```

Esto significa que el código de cada página se carga **solo cuando el usuario navega a esa ruta**, mejorando el rendimiento inicial de la aplicación.

---

## 5. Mini CRUD - Gestión de Servicios

### 5.1 Ubicación

El Mini CRUD está implementado en el **Panel de Admin** (`/admin`).

### 5.2 Funcionalidades

1. **Crear**: Formulario para agregar nuevos servicios
2. **Leer**: Ver lista de todos los servicios
3. **Eliminar**: Botón para eliminar servicios existentes

### 5.3 Interfaz de Creación

El formulario en Admin permite crear servicios con los siguientes campos:
- Nombre del Servicio
- Descripción Breve
- Descripción Completa
- Categoría (select)
- Estado (Activo/Beta/Próximamente)
- Plataformas (separadas por coma)

### 5.4 Ejemplo de Uso

```typescript
// Crear servicio
addService({
  name: 'Nuevo Servicio',
  shortDescription: 'Descripción breve',
  fullDescription: 'Descripción completa',
  platform: ['TikTok', 'Instagram'],
  platformIcon: 'smart_toy',
  deliverables: ['Entregable 1'],
  steps: [{ step: '01', title: 'Inicio', icon: 'star' }],
  testimonial: 'Testimonio',
  status: 'Active Agent',
  statusType: 'active',
  image: '',
  category: 'Video',
  featured: false
});

// Eliminar servicio
removeService('viral-reels-creator');
```

---

## 6. Alcance del Proyecto

### 6.1 Requisitos de la Entrega vs Implementación

| # | Requisito | Estado |
|---|---|---|
| 1 | Visualización de Servicios (cards) | ✅ |
| 2 | Detalle del Servicio | ✅ |
| 3 | Gestión de Favoritos (localStorage) | ✅ |
| 4 | Página de Inicio (Home) | ✅ |
| 5 | Página de Contacto (validaciones) | ✅ |
| 6 | Mini CRUD (crear/eliminar) | ✅ |

### 6.2 Funcionalidades Cubiertas ✅

| Funcionalidad | Descripción | Estado |
|---|---|---|
| Página Landing | Hero, Featured Agents, Timeline, CTA | ✅ Completado |
| Catálogo | Grid de servicios con filtros (plataforma, categoría) | ✅ Completado |
| Búsqueda | Buscar agentes por nombre o descripción | ✅ Completado |
| Detalles de Servicio | Información completa, entregables, workflow | ✅ Completado |
| Sistema de Favoritos | Guardar/remover favoritos con localStorage | ✅ Completado |
| Página de Favoritos | Ver lista de agentes guardados | ✅ Completado |
| Formulario de Contacto | Formulario con validación visual | ✅ Completado |
| Panel Admin | Dashboard con estadísticas y CRUD | ✅ Completado |
| Mini CRUD | Crear y eliminar servicios | ✅ Completado |
| Diseño Responsivo | Adaptable a móvil y desktop | ✅ Completado |
| Dark Theme | Tema oscuro coherente | ✅ Completado |
| Navegación | Router con lazy loading | ✅ Completado |

### 6.3 Funcionalidades NO Cubiertas ❌

| Funcionalidad | Razón | Sugerencia Futura |
|---|---|---|
| Edición de servicios | Solo crear/eliminar | Agregar funcionalidad update |
| Backend real | Solo frontend prototype | Conectar a Firebase, Supabase o API REST |
| Autenticación | No requerido para el scope | Implementar Auth con JWT/Firebase Auth |
| Base de datos | Datos en memoria (sin persistencia) | Migrar a PostgreSQL/MongoDB |
| Pago | No implementado | Stripe, PayPal |
| Envío de emails | Formulario sin backend | SendGrid, Nodemailer |
| Tests unitarios | No incluidos | Agregar Vitest/Jasmine |
| SEO | Angular SPA | Angular Universal/SSR |
| PWA | No configurado | @angular/pwa |

### 6.4 Limitaciones Conocidas

1. **Persistencia limitada**: Los favoritos se guardan en localStorage. Si el usuario borra cache, se pierden.

2. **Datos en memoria**: Los servicios creados/eliminados solo persisten durante la sesión. Al recargar la página se resetean a los 8 originales.

3. **Formulario sin acción**: El formulario de contacto tiene validación visual pero no envía emails.

4. **Single browser**: Los favoritos solo existen en el navegador donde se crean.

---

## 7. Cómo Ejecutar el Proyecto

### 7.1 Requisitos

- Node.js 18+
- Bun (ya configurado) o npm

### 7.2 Comandos

```bash
# Instalar dependencias (ya hecho)
bun install

# Iniciar servidor de desarrollo
bun run start

# Construir para producción
bun run build

# Ejecutar tests
bun run test
```

### 7.3 Acceder

Una vez iniciado el servidor, visitar: `http://localhost:4200/`

---

## 8. Referencias Técnicas

- **Signals**: Sistema de reactivity de Angular para estado reactivo
- **Standalone Components**: Componentes sin NgModule
- **Lazy Loading**: Carga diferida de rutas
- **Tailwind CSS**: Framework de estilos ya configurado
- **Router**: Sistema de navegación con parámetros query
- **localStorage**: Persistencia en navegador
- **computed()**: Funciones reactivas calculadas

---

*Documento generado para el proyecto universitario - Aetheris AI Landing*
*Fecha: Abril 2026*