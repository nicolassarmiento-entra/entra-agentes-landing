import { Injectable, signal, computed, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private platformId = inject(PLATFORM_ID);
  private storageKey = 'aetheris-favorites';
  
  private _favorites = signal<string[]>([]);
  
  readonly favorites = this._favorites.asReadonly();
  readonly count = computed(() => this._favorites().length);
  
  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFromStorage();
      
      effect(() => {
        localStorage.setItem(this.storageKey, JSON.stringify(this._favorites()));
      });
    }
  }
  
  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        this._favorites.set(JSON.parse(stored));
      } catch {
        this._favorites.set([]);
      }
    }
  }
  
  isFavorite(id: string): boolean {
    return this._favorites().includes(id);
  }
  
  toggle(id: string): void {
    if (this.isFavorite(id)) {
      this._favorites.update(favs => favs.filter(f => f !== id));
    } else {
      this._favorites.update(favs => [...favs, id]);
    }
  }
  
  add(id: string): void {
    if (!this.isFavorite(id)) {
      this._favorites.update(favs => [...favs, id]);
    }
  }
  
  remove(id: string): void {
    this._favorites.update(favs => favs.filter(f => f !== id));
  }
  
  clear(): void {
    this._favorites.set([]);
  }
}