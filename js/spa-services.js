// Spa Services Management System
const SERVICES_KEY = 'hc_spa_services';
const CART_KEY = 'hc_spa_cart';

// Service Icons Mapping
const serviceIcons = {
  'Swedish Massage': '💆',
  'G5 Massage': '💆‍♀️',
  'Deep Sea Massage': '🌊',
  'Hot Stone Massage': '🔥',
  'Traditional Hammam': '🧖',
  'Schooler Hammam': '🧖‍♂️',
  'Basic Hammam': '🛁',
  'Marrakech Hammam': '✨',
  'Baritone Facial': '✨',
  'Acne Facial': '💧',
  'Dermaplaning': '💎',
  'Strip Wax': '🪒',
  'Trigger Wax': '🔆',
  'IV Therapy': '💉',
  'Dental Care': '🦷',
  'Bump Removal Treatment': '💊',
  'Laser Hair Removal': '⚡',
  'Makeup Services': '💄',
  'Lashes': '👁️',
  'Nails': '💅',
  'Hair Washing & Drying': '💇',
  'Relaxing': '🌺',
  'Settings': '💇‍♀️',
  'Barbie Services': '👥',
  'Studio Portrait': '📸',
  'Student Portrait': '🎓',
  'Family Portrait': '👨‍👩‍👧',
  'Studio Hotel Session': '🏨'
};

// Initialize services
function initializeServices() {
  let services = JSON.parse(localStorage.getItem(SERVICES_KEY) || '[]');
  
  if (services.length === 0) {
    services = [
      // Massage
      { id: 1, name: 'Swedish Massage', category: 'massage', price: 10000, duration: 60, description: 'Classic full-body massage for deep relaxation and stress relief', popular: true },
      { id: 2, name: 'G5 Massage', category: 'massage', price: 12000, duration: 45, description: 'Advanced mechanical massage therapy for muscle toning', popular: false },
      { id: 3, name: 'Deep Sea Massage', category: 'massage', price: 15000, duration: 75, description: 'Intense deep tissue treatment for chronic muscle tension', popular: true },
      { id: 4, name: 'Hot Stone Massage', category: 'massage', price: 14000, duration: 90, description: 'Therapeutic massage using heated volcanic stones', popular: true },
      
      // Hammam Bar
      { id: 5, name: 'Traditional Hammam', category: 'hammam', price: 18000, duration: 90, description: 'Authentic Turkish bath experience with steam and scrubbing', popular: false },
      { id: 6, name: 'Schooler Hammam', category: 'hammam', price: 20000, duration: 120, description: 'Premium hammam ritual with luxury oils and treatments', popular: true },
      { id: 7, name: 'Basic Hammam', category: 'hammam', price: 10000, duration: 60, description: 'Essential cleansing and exfoliation hammam session', popular: false },
      { id: 8, name: 'Marrakech Hammam', category: 'hammam', price: 22000, duration: 120, description: 'Moroccan-inspired luxury spa ritual with argan oil', popular: true },
      
      // Spa - Facials & Waxing
      { id: 9, name: 'Baritone Facial', category: 'facial', price: 8000, duration: 45, description: 'Deep cleansing facial for all skin types', popular: false },
      { id: 10, name: 'Acne Facial', category: 'facial', price: 9000, duration: 60, description: 'Specialized treatment for acne-prone skin', popular: true },
      { id: 11, name: 'Dermaplaning', category: 'facial', price: 10000, duration: 45, description: 'Exfoliation treatment for smooth, glowing skin', popular: false },
      { id: 12, name: 'Strip Wax', category: 'facial', price: 6000, duration: 30, description: 'Professional hair removal for face and body', popular: false },
      { id: 13, name: 'Trigger Wax', category: 'facial', price: 7000, duration: 30, description: 'Advanced waxing technique for sensitive areas', popular: false },
      
      // Med Spa
      { id: 14, name: 'IV Therapy', category: 'medspa', price: 25000, duration: 45, description: 'Vitamin infusion therapy for wellness and recovery', popular: true },
      { id: 15, name: 'Dental Care', category: 'medspa', price: 30000, duration: 60, description: 'Professional dental cleaning and whitening', popular: false },
      { id: 16, name: 'Bump Removal Treatment', category: 'medspa', price: 15000, duration: 30, description: 'Safe removal of skin bumps and blemishes', popular: false },
      { id: 17, name: 'Laser Hair Removal', category: 'medspa', price: 20000, duration: 45, description: 'Permanent hair reduction with advanced laser technology', popular: true },
      
      // Cosmetics
      { id: 18, name: 'Makeup Services', category: 'cosmetics', price: 12000, duration: 60, description: 'Professional makeup for events, weddings, and photoshoots', popular: true },
      { id: 19, name: 'Lashes', category: 'cosmetics', price: 5000, duration: 30, description: 'Eyelash extensions and enhancement services', popular: true },
      { id: 20, name: 'Nails', category: 'cosmetics', price: 7000, duration: 45, description: 'Manicure, pedicure, and nail art services', popular: false },
      
      // Barbie (Hair & Glam)
      { id: 21, name: 'Hair Washing & Drying', category: 'hair', price: 5000, duration: 30, description: 'Professional hair wash and blow-dry styling', popular: false },
      { id: 22, name: 'Relaxing', category: 'hair', price: 6000, duration: 45, description: 'Hair relaxing treatment for smooth, manageable hair', popular: false },
      { id: 23, name: 'Settings', category: 'hair', price: 4000, duration: 30, description: 'Hair setting and styling services', popular: false },
      
      // Unisex Dining
      { id: 24, name: 'Barbie Services', category: 'unisex', price: 10000, duration: 60, description: 'Complete grooming services for men and women', popular: false },
      
      // Photography Studio
      { id: 25, name: 'Studio Portrait', category: 'photo', price: 8000, duration: 45, description: 'Professional studio portrait photography', popular: false },
      { id: 26, name: 'Student Portrait', category: 'photo', price: 5000, duration: 30, description: 'Affordable portrait packages for students', popular: false },
      { id: 27, name: 'Family Portrait', category: 'photo', price: 12000, duration: 60, description: 'Family photography session with multiple subjects', popular: true },
      { id: 28, name: 'Studio Hotel Session', category: 'photo', price: 15000, duration: 90, description: 'Premium studio session with hotel-style setup', popular: false }
    ];
    
    localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
  }
  
  return services;
}

// Cart management
let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');

function addToCart(serviceId) {
  const services = initializeServices();
  const service = services.find(s => s.id === serviceId);
  
  if (service) {
    cart.push({
      id: Date.now() + Math.random(),
      serviceId: service.id,
      name: service.name,
      price: service.price,
      category: service.category,
      duration: service.duration
    });
    
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCart();
    
    // Visual feedback
    showNotification(`✅ ${service.name} added to cart!`);
  }
}

function removeFromCart(cartItemId) {
  cart = cart.filter(item => item.id !== cartItemId);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCart();
}

function clearCart() {
  if (confirm('Clear all items from cart?')) {
    cart = [];
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCart();
  }
}

function updateCart() {
  const cartItemsEl = document.getElementById('cart-items');
  const cartCountEl = document.getElementById('cart-count');
  const cartSummaryEl = document.getElementById('cart-summary');
  
  cartCountEl.textContent = cart.length;
  
  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="empty-cart">
        <div style="font-size: 3rem; margin-bottom: var(--space-3); opacity: 0.5;">🛒</div>
        <p>Your cart is empty</p>
        <p style="font-size: 0.875rem; margin-top: var(--space-2);">Add services to get started</p>
      </div>
    `;
    cartSummaryEl.style.display = 'none';
    return;
  }
  
  cartSummaryEl.style.display = 'block';
  
  let html = '';
  let total = 0;
  
  cart.forEach(item => {
    total += item.price;
    html += `
      <div class="cart-item">
        <div style="flex: 1;">
          <div style="font-weight: 600; font-size: 0.938rem; margin-bottom: var(--space-1);">${item.name}</div>
          <div style="font-size: 0.875rem; color: var(--neutral-600);">₦${item.price.toLocaleString()} • ${item.duration} min</div>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="removeFromCart(${item.id})" style="color: var(--error-600); padding: var(--space-1);">✕</button>
      </div>
    `;
  });
  
  cartItemsEl.innerHTML = html;
  document.getElementById('cart-subtotal').textContent = `₦${total.toLocaleString()}`;
  document.getElementById('cart-total').textContent = `₦${total.toLocaleString()}`;
}

// Display services
function displayServices(services) {
  const grid = document.getElementById('services-grid');
  const resultsCount = document.getElementById('results-count');
  
  if (services.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: var(--space-10); color: var(--neutral-500);"><div style="font-size: 3rem; margin-bottom: var(--space-3);">🔍</div><p>No services found matching your criteria</p></div>';
    resultsCount.textContent = 'No results found';
    return;
  }
  
  resultsCount.textContent = `Showing ${services.length} service${services.length !== 1 ? 's' : ''}`;
  
  let html = '';
  services.forEach(service => {
    const icon = serviceIcons[service.name] || '✨';
    html += `
      <div class="service-card">
        ${service.popular ? '<span class="service-badge">Popular</span>' : ''}
        <div class="service-icon">${icon}</div>
        <div style="padding: var(--space-5);">
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: var(--space-2);">${service.name}</h3>
          <p style="color: var(--neutral-600); font-size: 0.875rem; line-height: 1.5; margin-bottom: var(--space-4);">${service.description}</p>
          
          <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-4);">
            <span class="price-tag">₦${service.price.toLocaleString()}</span>
            <span class="duration-tag">⏱️ ${service.duration} min</span>
          </div>
          
          <button class="btn btn-primary" style="width: 100%;" onclick="addToCart(${service.id})">Add to Cart</button>
        </div>
      </div>
    `;
  });
  
  grid.innerHTML = html;
}

// Display popular services
function displayPopularServices() {
  const services = initializeServices();
  const popular = services.filter(s => s.popular);
  const grid = document.getElementById('popular-services');
  
  let html = '';
  popular.slice(0, 6).forEach(service => {
    const icon = serviceIcons[service.name] || '✨';
    html += `
      <div class="service-card">
        <span class="service-badge">Popular</span>
        <div class="service-icon" style="height: 150px; font-size: 3rem;">${icon}</div>
        <div style="padding: var(--space-4);">
          <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: var(--space-2);">${service.name}</h4>
          <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-3);">
            <span style="font-weight: 800; font-size: 1.125rem; color: #10B981;">₦${service.price.toLocaleString()}</span>
            <span style="font-size: 0.75rem; color: var(--neutral-600);">• ${service.duration} min</span>
          </div>
          <button class="btn btn-secondary btn-sm" style="width: 100%;" onclick="addToCart(${service.id})">Add to Cart</button>
        </div>
      </div>
    `;
  });
  
  grid.innerHTML = html;
}

// Filter by category
let currentCategory = 'all';

function filterByCategory(category) {
  currentCategory = category;
  
  // Update active chip
  document.querySelectorAll('.category-chip').forEach(chip => {
    chip.classList.remove('active');
  });
  document.querySelector(`[data-category="${category}"]`).classList.add('active');
  
  const services = initializeServices();
  const filtered = category === 'all' ? services : services.filter(s => s.category === category);
  displayServices(filtered);
}

// Search functionality
function performSearch() {
  const query = document.getElementById('search-input').value.toLowerCase().trim();
  
  if (query.length === 0) {
    filterByCategory(currentCategory);
    return;
  }
  
  const services = initializeServices();
  let filtered = services.filter(s => 
    s.name.toLowerCase().includes(query) ||
    s.description.toLowerCase().includes(query) ||
    s.category.toLowerCase().includes(query)
  );
  
  if (currentCategory !== 'all') {
    filtered = filtered.filter(s => s.category === currentCategory);
  }
  
  displayServices(filtered);
}

// Search on Enter key
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }
});

// Checkout
function proceedToCheckout() {
  if (cart.length === 0) {
    alert('Your cart is empty. Please add services before proceeding.');
    return;
  }
  
  // Save cart to session for checkout page
  sessionStorage.setItem('spa_checkout_cart', JSON.stringify(cart));
  window.location.href = 'spa-checkout.html';
}

// Notification system
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(135deg, #10B981, #059669);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
    z-index: 10000;
    font-weight: 600;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const services = initializeServices();
  displayServices(services);
  displayPopularServices();
  updateCart();
});
