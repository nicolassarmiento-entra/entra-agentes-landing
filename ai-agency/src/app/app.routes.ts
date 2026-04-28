import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.component').then((m) => m.Landing),
  },
  {
    path: 'catalog',
    loadComponent: () => import('./pages/catalog/catalog.component').then((m) => m.Catalog),
  },
  {
    path: 'details',
    loadComponent: () => import('./pages/details/details.component').then((m) => m.Details),
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.component').then((m) => m.Favorites),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then((m) => m.Contact),
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then((m) => m.Admin),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/landing/landing.component').then((m) => m.Landing),
  },
];
