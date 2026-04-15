/* ============================================
   AETHERIS AI - Validators
   ============================================ */

const Validators = {
    // Email validation regex
    email: function(value) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    },
    
    // Required validation
    required: function(value) {
        return value && value.trim().length > 0;
    },
    
    // Name validation (at least 2 characters)
    name: function(value) {
        return value && value.trim().length >= 2;
    },
    
    // Phone validation (optional)
    phone: function(value) {
        if (!value || value.trim() === '') return true; // Optional field
        const regex = /^[\d\s\-\+\(\)]{7,20}$/;
        return regex.test(value);
    },
    
    // Validate single field
    validateField: function(fieldName, value) {
        switch(fieldName) {
            case 'name':
                if (!this.required(value)) {
                    return { valid: false, message: 'Name is required' };
                }
                if (!this.name(value)) {
                    return { valid: false, message: 'Name must be at least 2 characters' };
                }
                return { valid: true, message: '' };
                
            case 'email':
                if (!this.required(value)) {
                    return { valid: false, message: 'Email is required' };
                }
                if (!this.email(value)) {
                    return { valid: false, message: 'Please enter a valid email address' };
                }
                return { valid: true, message: '' };
                
            case 'company':
                // Company is optional
                return { valid: true, message: '' };
                
            case 'message':
                // Message is optional
                return { valid: true, message: '' };
                
            default:
                return { valid: true, message: '' };
        }
    },
    
    // Validate entire form
    validateForm: function(formData) {
        const errors = {};
        let isValid = true;
        
        for (const [field, value] of Object.entries(formData)) {
            const result = this.validateField(field, value);
            if (!result.valid) {
                errors[field] = result.message;
                isValid = false;
            }
        }
        
        return { valid: isValid, errors: errors };
    },
    
    // Set field error state
    setFieldState: function(input, isValid, showCheck) {
        if (!input) return;
        
        // Remove existing states
        input.classList.remove('input-error', 'input-success');
        
        if (showCheck && isValid) {
            input.classList.add('input-success');
        } else if (!isValid) {
            input.classList.add('input-error');
        }
    },
    
    // Show/hide error message
    showError: function(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        if (errorElement) {
            if (message) {
                errorElement.textContent = message;
                errorElement.classList.add('show');
            } else {
                errorElement.classList.remove('show');
            }
        }
    }
};

// Make it globally accessible
window.Validators = Validators;