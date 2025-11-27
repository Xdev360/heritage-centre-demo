/**
 * HERITAGE CENTRE - SHARED NAVIGATION & UTILITIES
 * This file provides common functionality across all pages
 */

// ========================================
// NAVIGATION COMPONENT
// ========================================
class NavigationManager {
  constructor() {
    this.initMobileMenu();
    this.initProfileDropdown();
    this.initScrollEffects();
    this.updateAuthState();
    this.highlightActivePage();
    this.initLogout();
  }

  initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        menu.classList.toggle('open');
        document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
      });

      // Close on link click
      menu.querySelectorAll('.mobile-menu-link').forEach(link => {
        link.addEventListener('click', () => {
          toggle.classList.remove('open');
          menu.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }
  }

  initProfileDropdown() {
    const trigger = document.getElementById('profile-trigger');
    const menu = document.getElementById('profile-menu');
    
    if (trigger && menu) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('open');
      });

      document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !trigger.contains(e.target)) {
          menu.classList.remove('open');
        }
      });
    }
  }

  initScrollEffects() {
    const header = document.getElementById('main-header');
    if (!header) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }

  updateAuthState() {
    const user = JSON.parse(localStorage.getItem('hc_user') || 'null');
    const role = localStorage.getItem('hc_user_role') || '';
    
    const signinBtn = document.getElementById('signin-btn');
    const createBtn = document.getElementById('create-btn');
    const profileDropdown = document.getElementById('profile-dropdown');
    const profileName = document.getElementById('profile-name');
    const profileAvatar = document.getElementById('profile-avatar');
    const adminLink = document.getElementById('admin-link');
    const ceoLink = document.getElementById('ceo-link');
    
    // Mobile menu elements
    const mobileSignin = document.getElementById('mobile-signin');
    const mobileAccount = document.getElementById('mobile-account');
    const mobileBookings = document.getElementById('mobile-bookings');
    const mobileLoyalty = document.getElementById('mobile-loyalty');

    if (user && user.name) {
      // User is logged in
      if (signinBtn) signinBtn.style.display = 'none';
      if (createBtn) createBtn.style.display = 'none';
      if (profileDropdown) profileDropdown.style.display = 'block';
      
      if (profileName) profileName.textContent = user.name.split(' ')[0];
      if (profileAvatar) profileAvatar.textContent = user.name.charAt(0).toUpperCase();
      
      // Mobile menu
      if (mobileSignin) mobileSignin.style.display = 'none';
      if (mobileAccount) mobileAccount.style.display = 'block';
      if (mobileBookings) mobileBookings.style.display = 'block';
      if (mobileLoyalty) mobileLoyalty.style.display = 'block';
      
      // Role-based access - ONLY show admin/CEO links if user has role
      if (role === 'admin' && adminLink) {
        adminLink.style.display = 'block';
      }
      if (role === 'ceo' && ceoLink) {
        ceoLink.style.display = 'block';
      }
    } else {
      // User is not logged in
      if (signinBtn) signinBtn.style.display = 'inline-flex';
      if (createBtn) createBtn.style.display = 'inline-flex';
      if (profileDropdown) profileDropdown.style.display = 'none';
      
      // Mobile menu
      if (mobileSignin) mobileSignin.style.display = 'block';
      if (mobileAccount) {
        mobileAccount.textContent = 'Create Account';
        mobileAccount.style.display = 'block';
      }
      if (mobileBookings) mobileBookings.style.display = 'none';
      if (mobileLoyalty) mobileLoyalty.style.display = 'none';
      
      // Always hide admin links for non-logged-in users
      if (adminLink) adminLink.style.display = 'none';
      if (ceoLink) ceoLink.style.display = 'none';
    }
  }

  highlightActivePage() {
    const currentPage = document.body.getAttribute('data-page');
    if (!currentPage) return;

    const navLink = document.querySelector(`.nav-link[data-page="${currentPage}"]`);
    if (navLink) {
      navLink.classList.add('active');
    }
  }

  initLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('hc_user');
        localStorage.removeItem('hc_user_role');
        this.updateAuthState();
        window.location.href = 'index.html';
      });
    }
  }
}

// ========================================
// BREADCRUMB UTILITIES
// ========================================
function createBreadcrumbs(items) {
  const container = document.createElement('nav');
  container.className = 'breadcrumbs';
  
  items.forEach((item, index) => {
    if (index > 0) {
      const separator = document.createElement('span');
      separator.className = 'breadcrumb-separator';
      separator.textContent = '/';
      container.appendChild(separator);
    }
    
    const crumb = document.createElement(item.href ? 'a' : 'span');
    crumb.className = `breadcrumb-item ${item.active ? 'active' : ''}`;
    crumb.textContent = item.label;
    if (item.href) {
      crumb.href = item.href;
    }
    container.appendChild(crumb);
  });
  
  return container;
}

// ========================================
// LAZY LOADING
// ========================================
function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
}

// ========================================
// FORM VALIDATION
// ========================================
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  const re = /^[\d\s\-\+\(\)]+$/;
  return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// ========================================
// LOCAL STORAGE HELPERS
// ========================================
const Storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Error reading from localStorage:', e);
      return defaultValue;
    }
  },
  
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Error writing to localStorage:', e);
      return false;
    }
  },
  
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Error removing from localStorage:', e);
      return false;
    }
  }
};

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message, type = 'info', duration = 3000) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: var(--space-4);
    background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--error)' : 'var(--info)'};
    color: white;
    padding: var(--space-4) var(--space-6);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
    max-width: 400px;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

// Add animation styles
if (!document.getElementById('notification-styles')) {
  const style = document.createElement('style');
  style.id = 'notification-styles';
  style.textContent = `
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// ========================================
// INITIALIZE ON DOM READY
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize navigation
  window.navManager = new NavigationManager();
  
  // Initialize lazy loading
  initLazyLoading();
  
  // Update auth state on storage changes (from other tabs)
  window.addEventListener('storage', () => {
    if (window.navManager) {
      window.navManager.updateAuthState();
    }
  });
});

// Export for use in other scripts
window.Heritage = {
  Navigation: NavigationManager,
  Storage,
  showNotification,
  validateEmail,
  validatePhone,
  createBreadcrumbs,
  initLazyLoading
};
