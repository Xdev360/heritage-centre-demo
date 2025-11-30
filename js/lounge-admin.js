// ========================================
// LOUNGE ADMIN DASHBOARD
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    checkAdminAuth();
    initAdminNavigation();
    loadReservationsData();
    loadOrdersData();
    loadEventsData();
    loadMenuData();
});

// Check admin authentication
function checkAdminAuth() {
    const user = JSON.parse(localStorage.getItem('hc_user') || 'null');
    const role = localStorage.getItem('hc_user_role');
    
    if (!user || role !== 'admin') {
        alert('Access denied. Admin login required.');
        window.location.href = 'index.html';
        return;
    }
    
    document.getElementById('adminName').textContent = user.name || 'Admin';
}

// Initialize admin navigation
function initAdminNavigation() {
    const navButtons = document.querySelectorAll('.admin-nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const sections = document.querySelectorAll('.admin-section');
            sections.forEach(s => s.classList.remove('active'));
            
            const section = document.getElementById(btn.dataset.section + '-section');
            if (section) section.classList.add('active');
        });
    });
}

// Load reservations data
function loadReservationsData() {
    const reservations = JSON.parse(localStorage.getItem('hc_lounge_reservations') || '[]');
    
    // Update stats
    document.getElementById('totalReservations').textContent = reservations.length;
    document.getElementById('pendingReservations').textContent = reservations.filter(r => r.status === 'pending').length;
    document.getElementById('vipReservations').textContent = reservations.filter(r => r.tableType === 'vip').length;
    
    const totalRevenue = reservations.reduce((sum, r) => sum + (r.total || 0), 0);
    document.getElementById('totalReservationRevenue').textContent = `₦${totalRevenue.toLocaleString()}`;
    
    // Render table
    renderReservationsTable(reservations);
    
    // Add filter listener
    document.getElementById('reservationStatusFilter').addEventListener('change', (e) => {
        const filtered = e.target.value === 'all' 
            ? reservations 
            : reservations.filter(r => r.status === e.target.value);
        renderReservationsTable(filtered);
    });
}

// Render reservations table
function renderReservationsTable(reservations) {
    const container = document.getElementById('reservationsTable');
    if (!container) return;
    
    if (reservations.length === 0) {
        container.innerHTML = '<p class="admin-no-data">No reservations found.</p>';
        return;
    }
    
    let html = '<table class="admin-table"><thead><tr><th>ID</th><th>Customer</th><th>Date & Time</th><th>Guests</th><th>Type</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead><tbody>';
    
    reservations.forEach(res => {
        const date = new Date(res.date).toLocaleDateString();
        html += `
            <tr>
                <td>${res.id}</td>
                <td>${res.customerName}<br><small>${res.customerEmail}</small></td>
                <td>${date} at ${formatTime(res.time)}</td>
                <td>${res.guests}</td>
                <td><span class="admin-badge ${res.tableType === 'vip' ? 'vip' : 'regular'}">${res.tableType.toUpperCase()}</span></td>
                <td>₦${(res.total || 0).toLocaleString()}</td>
                <td><span class="admin-status ${res.status}">${res.status}</span></td>
                <td>
                    ${res.status === 'pending' ? `
                        <button onclick="updateReservationStatus('${res.id}', 'confirmed')" class="admin-action-btn approve">Confirm</button>
                        <button onclick="updateReservationStatus('${res.id}', 'cancelled')" class="admin-action-btn reject">Cancel</button>
                    ` : ''}
                </td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Update reservation status
function updateReservationStatus(id, status) {
    const reservations = JSON.parse(localStorage.getItem('hc_lounge_reservations') || '[]');
    const reservation = reservations.find(r => r.id === id);
    
    if (reservation) {
        reservation.status = status;
        localStorage.setItem('hc_lounge_reservations', JSON.stringify(reservations));
        loadReservationsData();
        alert(`Reservation ${status} successfully!`);
    }
}

// Load orders data
function loadOrdersData() {
    const orders = JSON.parse(localStorage.getItem('hc_lounge_orders') || '[]');
    
    // Update stats
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('activeOrders').textContent = orders.filter(o => o.status === 'preparing').length;
    
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    document.getElementById('totalOrderRevenue').textContent = `₦${totalRevenue.toLocaleString()}`;
    
    // Render table
    renderOrdersTable(orders);
    
    // Add filter listener
    document.getElementById('orderStatusFilter').addEventListener('change', (e) => {
        const filtered = e.target.value === 'all' 
            ? orders 
            : orders.filter(o => o.status === e.target.value);
        renderOrdersTable(filtered);
    });
}

// Render orders table
function renderOrdersTable(orders) {
    const container = document.getElementById('ordersTable');
    if (!container) return;
    
    if (orders.length === 0) {
        container.innerHTML = '<p class="admin-no-data">No orders found.</p>';
        return;
    }
    
    let html = '<table class="admin-table"><thead><tr><th>Order ID</th><th>Table</th><th>Items</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead><tbody>';
    
    orders.forEach(order => {
        const itemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
        html += `
            <tr>
                <td>${order.id}</td>
                <td>${order.tableNumber}</td>
                <td>${itemsCount} items<br><button onclick="viewOrderDetails('${order.id}')" class="admin-link-btn">View Details</button></td>
                <td>₦${(order.total || 0).toLocaleString()}</td>
                <td><span class="admin-status ${order.status}">${order.status}</span></td>
                <td>
                    ${order.status === 'preparing' ? `
                        <button onclick="updateOrderStatus('${order.id}', 'served')" class="admin-action-btn approve">Mark Served</button>
                    ` : order.status === 'served' ? `
                        <button onclick="updateOrderStatus('${order.id}', 'completed')" class="admin-action-btn approve">Complete</button>
                    ` : ''}
                </td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Update order status
function updateOrderStatus(id, status) {
    const orders = JSON.parse(localStorage.getItem('hc_lounge_orders') || '[]');
    const order = orders.find(o => o.id === id);
    
    if (order) {
        order.status = status;
        localStorage.setItem('hc_lounge_orders', JSON.stringify(orders));
        loadOrdersData();
        alert(`Order marked as ${status}!`);
    }
}

// View order details
function viewOrderDetails(id) {
    const orders = JSON.parse(localStorage.getItem('hc_lounge_orders') || '[]');
    const order = orders.find(o => o.id === id);
    
    if (order) {
        let details = `Order ID: ${order.id}\nTable: ${order.tableNumber}\n\nItems:\n`;
        order.items.forEach(item => {
            details += `${item.quantity}x ${item.name} - ₦${(item.price * item.quantity).toLocaleString()}\n`;
        });
        details += `\nSubtotal: ₦${order.subtotal.toLocaleString()}`;
        details += `\nService Charge: ₦${order.serviceCharge.toLocaleString()}`;
        details += `\nTotal: ₦${order.total.toLocaleString()}`;
        
        alert(details);
    }
}

// Load events data
function loadEventsData() {
    const tickets = JSON.parse(localStorage.getItem('hc_lounge_event_tickets') || '[]');
    
    // Update stats
    const totalTickets = tickets.reduce((sum, t) => sum + t.quantity, 0);
    document.getElementById('totalTicketsSold').textContent = totalTickets;
    
    const totalRevenue = tickets.reduce((sum, t) => sum + (t.total || 0), 0);
    document.getElementById('totalTicketRevenue').textContent = `₦${totalRevenue.toLocaleString()}`;
    
    // Render table
    renderEventsTable(tickets);
}

// Render events table
function renderEventsTable(tickets) {
    const container = document.getElementById('eventsTable');
    if (!container) return;
    
    if (tickets.length === 0) {
        container.innerHTML = '<p class="admin-no-data">No ticket sales found.</p>';
        return;
    }
    
    let html = '<table class="admin-table"><thead><tr><th>Ticket ID</th><th>Event</th><th>Customer</th><th>Quantity</th><th>Total</th><th>Status</th></tr></thead><tbody>';
    
    tickets.forEach(ticket => {
        const eventDate = new Date(ticket.eventDate).toLocaleDateString();
        html += `
            <tr>
                <td>${ticket.id}</td>
                <td>${ticket.eventName}<br><small>${eventDate} at ${formatTime(ticket.eventTime)}</small></td>
                <td>${ticket.buyerName}<br><small>${ticket.buyerEmail}</small></td>
                <td>${ticket.quantity}</td>
                <td>₦${(ticket.total || 0).toLocaleString()}</td>
                <td><span class="admin-status ${ticket.status}">${ticket.status}</span></td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Load menu data
function loadMenuData() {
    const menuData = JSON.parse(localStorage.getItem('lounge_menu') || '{}');
    let allItems = [];
    
    Object.keys(menuData).forEach(category => {
        allItems = allItems.concat(menuData[category]);
    });
    
    renderMenuTable(allItems);
}

// Render menu table
function renderMenuTable(items) {
    const container = document.getElementById('menuItemsTable');
    if (!container) return;
    
    if (items.length === 0) {
        container.innerHTML = '<p class="admin-no-data">No menu items found.</p>';
        return;
    }
    
    let html = '<table class="admin-table"><thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Description</th><th>Actions</th></tr></thead><tbody>';
    
    items.forEach(item => {
        html += `
            <tr>
                <td>${item.name}</td>
                <td><span class="admin-badge">${item.category}</span></td>
                <td>₦${item.price.toLocaleString()}</td>
                <td>${item.description}</td>
                <td>
                    <button onclick="editMenuItem('${item.id}')" class="admin-action-btn edit">Edit</button>
                    <button onclick="deleteMenuItem('${item.id}')" class="admin-action-btn reject">Delete</button>
                </td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Show add menu item modal
function showAddMenuItemModal() {
    document.getElementById('menuItemModalTitle').textContent = 'Add Menu Item';
    document.getElementById('menuItemForm').reset();
    document.getElementById('menuItemModal').classList.add('active');
}

// Close menu item modal
function closeMenuItemModal() {
    document.getElementById('menuItemModal').classList.remove('active');
}

// Edit menu item
function editMenuItem(id) {
    alert('Edit functionality - Update item: ' + id);
}

// Delete menu item
function deleteMenuItem(id) {
    if (confirm('Are you sure you want to delete this menu item?')) {
        const menuData = JSON.parse(localStorage.getItem('lounge_menu') || '{}');
        
        Object.keys(menuData).forEach(category => {
            menuData[category] = menuData[category].filter(item => item.id !== id);
        });
        
        localStorage.setItem('lounge_menu', JSON.stringify(menuData));
        loadMenuData();
        alert('Menu item deleted successfully!');
    }
}

// Format time helper
function formatTime(time24) {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes || '00'} ${ampm}`;
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('hc_user');
        localStorage.removeItem('hc_user_role');
        window.location.href = 'index.html';
    }
}
