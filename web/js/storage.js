/* ============================================
   AETHERIS AI - Storage (localStorage)
   ============================================ */

const Storage = {
    FAVORITES_KEY: 'aetheris_favorites',
    
    // Get all favorites
    getFavorites: function() {
        const stored = localStorage.getItem(this.FAVORITES_KEY);
        return stored ? JSON.parse(stored) : [];
    },
    
    // Set favorites
    setFavorites: function(favorites) {
        localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    },
    
    // Check if service is favorite
    isFavorite: function(serviceId) {
        const favorites = this.getFavorites();
        return favorites.includes(serviceId);
    },
    
    // Toggle favorite
    toggleFavorite: function(serviceId) {
        const favorites = this.getFavorites();
        const index = favorites.indexOf(serviceId);
        
        if (index > -1) {
            favorites.splice(index, 1);
            this.showToast('Removed from favorites', 'success');
        } else {
            favorites.push(serviceId);
            this.showToast('Added to favorites', 'success');
        }
        
        this.setFavorites(favorites);
        return this.getFavorites();
    },
    
    // Get favorite services objects
    getFavoriteServices: function() {
        const favoriteIds = this.getFavorites();
        return SERVICES.filter(s => favoriteIds.includes(s.id));
    },
    
    // Toast notification
    showToast: function(message, type) {
        const existingToast = document.getElementById('toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span class="material-symbols-outlined">${type === 'success' ? 'check_circle' : 'error'}</span>
            ${message}
        `;
        
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },
    
    // Clear all favorites
    clearFavorites: function() {
        this.setFavorites([]);
    }
};

// Make it globally accessible
window.Storage = Storage;