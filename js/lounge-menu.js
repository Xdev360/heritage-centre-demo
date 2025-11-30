// ========================================
// LOUNGE MENU PAGE
// ========================================

let cart = JSON.parse(localStorage.getItem('lounge_cart') || '[]');
let currentFilter = 'all';

// Load menu on page load
document.addEventListener('DOMContentLoaded', () => {
    loadMenu();
    updateCartDisplay();
    initMenuNavigation();
    initCartModal();
});

// Initialize menu navigation
function initMenuNavigation() {
    const navButtons = document.querySelectorAll('.lounge-menu-nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.category;
            loadMenu();
        });
    });
}

// Load menu items
function loadMenu() {
    const menuData = JSON.parse(localStorage.getItem('lounge_menu') || '{}');
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid) return;

    menuGrid.innerHTML = '';

    // Flatten all menu categories
    let allItems = [];
    Object.keys(menuData).forEach(category => {
        allItems = allItems.concat(menuData[category]);
    });

    // Filter items
    const filteredItems = currentFilter === 'all' 
        ? allItems 
        : allItems.filter(item => item.category === currentFilter);

    if (filteredItems.length === 0) {
        menuGrid.innerHTML = '<p class="lounge-no-items">No items found in this category.</p>';
        return;
    }

    // Render menu items
    filteredItems.forEach(item => {
        const menuCard = createMenuCard(item);
        menuGrid.appendChild(menuCard);
    });
}

// Create menu card
function createMenuCard(item) {
    const card = document.createElement('div');
    card.className = 'lounge-menu-card';
    
    card.innerHTML = `
        <div class="lounge-menu-card-image">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='assets/placeholder-food.jpg'">
            ${item.vegetarian ? '<span class="lounge-veg-badge">🌿 Vegetarian</span>' : ''}
            ${item.vipOnly ? '<span class="lounge-vip-badge">VIP Only</span>' : ''}
        </div>
        <div class="lounge-menu-card-content">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="lounge-menu-card-footer">
                <span class="lounge-menu-price">₦${item.price.toLocaleString()}</span>
                <button onclick="addToCart('${item.id}')" class="lounge-btn lounge-btn-primary lounge-btn-small">
                    Add to Order
                </button>
            </div>
        </div>
    `;

    return card;
}

// Add item to cart
function addToCart(itemId) {
    const menuData = JSON.parse(localStorage.getItem('lounge_menu') || '{}');
    let item = null;

    // Find item in menu
    Object.keys(menuData).forEach(category => {
        const found = menuData[category].find(i => i.id === itemId);
        if (found) item = found;
    });

    if (!item) return;

    // Check if item already in cart
    const existingItem = cart.find(i => i.id === itemId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    // Save cart
    localStorage.setItem('lounge_cart', JSON.stringify(cart));
    updateCartDisplay();

    // Show feedback
    showToast(`${item.name} added to your order`);
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;
    }
}

// Initialize cart modal
function initCartModal() {
    const viewCartBtn = document.getElementById('viewCartBtn');
    if (viewCartBtn) {
        viewCartBtn.addEventListener('click', openCartModal);
    }
}

// Open cart modal
function openCartModal() {
    const modal = document.getElementById('cartModal');
    if (!modal) return;

    renderCartItems();
    modal.classList.add('active');
}

// Close cart modal
function closeCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="lounge-empty-cart">Your order is empty. Browse our menu to get started!</p>';
        updateCartSummary();
        return;
    }

    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'lounge-cart-item';
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" onerror="this.src='assets/placeholder-food.jpg'">
            <div class="lounge-cart-item-details">
                <h4>${item.name}</h4>
                <p class="lounge-cart-item-price">₦${item.price.toLocaleString()}</p>
            </div>
            <div class="lounge-cart-item-controls">
                <button onclick="decreaseQuantity('${item.id}')" class="lounge-qty-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                </button>
                <span class="lounge-qty">${item.quantity}</span>
                <button onclick="increaseQuantity('${item.id}')" class="lounge-qty-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                </button>
                <button onclick="removeFromCart('${item.id}')" class="lounge-remove-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    updateCartSummary();
}

// Increase quantity
function increaseQuantity(itemId) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity++;
        localStorage.setItem('lounge_cart', JSON.stringify(cart));
        renderCartItems();
        updateCartDisplay();
    }
}

// Decrease quantity
function decreaseQuantity(itemId) {
    const item = cart.find(i => i.id === itemId);
    if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem('lounge_cart', JSON.stringify(cart));
        renderCartItems();
        updateCartDisplay();
    }
}

// Remove from cart
function removeFromCart(itemId) {
    cart = cart.filter(i => i.id !== itemId);
    localStorage.setItem('lounge_cart', JSON.stringify(cart));
    renderCartItems();
    updateCartDisplay();
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const serviceCharge = subtotal * 0.1;
    const total = subtotal + serviceCharge;

    document.getElementById('cartSubtotal').textContent = `₦${subtotal.toLocaleString()}`;
    document.getElementById('cartServiceCharge').textContent = `₦${serviceCharge.toLocaleString()}`;
    document.getElementById('cartTotal').textContent = `₦${total.toLocaleString()}`;
}

// Place order
function placeOrder() {
    const tableNumber = document.getElementById('tableNumber')?.value.trim();

    if (!tableNumber) {
        showToast('Please enter your table number or reservation ID', 'error');
        return;
    }

    if (cart.length === 0) {
        showToast('Your order is empty', 'error');
        return;
    }

    // Create order
    const order = {
        id: 'LO-' + Date.now(),
        tableNumber: tableNumber,
        items: cart,
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        serviceCharge: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.1,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.1,
        status: 'preparing',
        createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const orders = JSON.parse(localStorage.getItem('hc_lounge_orders') || '[]');
    orders.push(order);
    localStorage.setItem('hc_lounge_orders', JSON.stringify(orders));

    // Show success modal
    showOrderSuccess(order);

    // Clear cart
    cart = [];
    localStorage.setItem('lounge_cart', JSON.stringify(cart));
    updateCartDisplay();
    closeCartModal();
}

// Show order success
function showOrderSuccess(order) {
    const modal = document.getElementById('orderSuccessModal');
    if (!modal) return;

    document.getElementById('orderId').textContent = order.id;
    document.getElementById('orderTable').textContent = order.tableNumber;
    document.getElementById('orderTotal').textContent = `₦${order.total.toLocaleString()}`;

    modal.classList.add('active');
}

// Close order success modal
function closeOrderSuccessModal() {
    const modal = document.getElementById('orderSuccessModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `lounge-toast lounge-toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
