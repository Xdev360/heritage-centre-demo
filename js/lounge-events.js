// ========================================
// LOUNGE EVENTS PAGE
// ========================================

let currentEventFilter = 'all';
let selectedEvent = null;
let ticketQuantity = 1;

document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    initEventFilters();
    initTicketForm();
});

// Initialize event filters
function initEventFilters() {
    const filterButtons = document.querySelectorAll('.lounge-filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentEventFilter = btn.dataset.filter;
            loadEvents();
        });
    });
}

// Load events
function loadEvents() {
    const eventsData = JSON.parse(localStorage.getItem('lounge_events') || '[]');
    const eventsGrid = document.getElementById('eventsGrid');
    if (!eventsGrid) return;

    eventsGrid.innerHTML = '';

    // Filter events
    const filteredEvents = currentEventFilter === 'all'
        ? eventsData
        : eventsData.filter(event => event.category === currentEventFilter);

    if (filteredEvents.length === 0) {
        eventsGrid.innerHTML = '<p class="lounge-no-items">No events found in this category.</p>';
        return;
    }

    // Render events
    filteredEvents.forEach(event => {
        const eventCard = createEventCard(event);
        eventsGrid.appendChild(eventCard);
    });
}

// Create event card
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'lounge-event-card';

    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    card.innerHTML = `
        <div class="lounge-event-card-image">
            <img src="${event.image}" alt="${event.name}" onerror="this.src='assets/placeholder-event.jpg'">
            ${event.vipOnly ? '<span class="lounge-event-vip-badge">VIP Only</span>' : ''}
            <div class="lounge-event-category">${event.category}</div>
        </div>
        <div class="lounge-event-card-content">
            <h3>${event.name}</h3>
            <div class="lounge-event-meta">
                <span class="lounge-event-date">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    ${formattedDate}
                </span>
                <span class="lounge-event-time">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    ${formatTime(event.time)}
                </span>
            </div>
            <p>${event.description}</p>
            <div class="lounge-event-footer">
                <div class="lounge-event-price-section">
                    <span class="lounge-event-price">₦${event.price.toLocaleString()}</span>
                    <span class="lounge-event-tickets-left">${event.ticketsAvailable} tickets left</span>
                </div>
                <button onclick='openTicketModal(${JSON.stringify(event)})' class="lounge-btn lounge-btn-primary lounge-btn-small">
                    Buy Tickets
                </button>
            </div>
        </div>
    `;

    return card;
}

// Format time
function formatTime(time24) {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes || '00'} ${ampm}`;
}

// Open ticket modal
function openTicketModal(event) {
    selectedEvent = event;
    const modal = document.getElementById('ticketModal');
    if (!modal) return;

    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    document.getElementById('ticketEventName').textContent = event.name;
    document.getElementById('ticketDate').textContent = formattedDate;
    document.getElementById('ticketTime').textContent = formatTime(event.time);
    document.getElementById('ticketPrice').textContent = `₦${event.price.toLocaleString()}`;

    // Reset quantity
    ticketQuantity = 1;
    document.getElementById('ticketQuantity').value = ticketQuantity;
    updateTicketSummary();

    modal.classList.add('active');
}

// Close ticket modal
function closeTicketModal() {
    const modal = document.getElementById('ticketModal');
    if (modal) {
        modal.classList.remove('active');
    }
    document.getElementById('ticketPurchaseForm').reset();
}

// Increase ticket quantity
function increaseTicketQty() {
    const input = document.getElementById('ticketQuantity');
    if (ticketQuantity < 10) {
        ticketQuantity++;
        input.value = ticketQuantity;
        updateTicketSummary();
    }
}

// Decrease ticket quantity
function decreaseTicketQty() {
    const input = document.getElementById('ticketQuantity');
    if (ticketQuantity > 1) {
        ticketQuantity--;
        input.value = ticketQuantity;
        updateTicketSummary();
    }
}

// Update ticket summary
function updateTicketSummary() {
    if (!selectedEvent) return;

    const subtotal = selectedEvent.price * ticketQuantity;
    const fee = subtotal * 0.05;
    const total = subtotal + fee;

    document.getElementById('summaryQty').textContent = ticketQuantity;
    document.getElementById('summarySubtotal').textContent = `₦${subtotal.toLocaleString()}`;
    document.getElementById('summaryFee').textContent = `₦${fee.toLocaleString()}`;
    document.getElementById('summaryTotal').textContent = `₦${total.toLocaleString()}`;
}

// Initialize ticket form
function initTicketForm() {
    const form = document.getElementById('ticketPurchaseForm');
    if (!form) return;

    form.addEventListener('submit', handleTicketPurchase);
}

// Handle ticket purchase
function handleTicketPurchase(e) {
    e.preventDefault();

    if (!selectedEvent) return;

    const buyerName = document.getElementById('buyerName').value;
    const buyerEmail = document.getElementById('buyerEmail').value;
    const buyerPhone = document.getElementById('buyerPhone').value;

    const subtotal = selectedEvent.price * ticketQuantity;
    const fee = subtotal * 0.05;
    const total = subtotal + fee;

    const purchase = {
        id: 'LET-' + Date.now(),
        eventId: selectedEvent.id,
        eventName: selectedEvent.name,
        eventDate: selectedEvent.date,
        eventTime: selectedEvent.time,
        quantity: ticketQuantity,
        buyerName: buyerName,
        buyerEmail: buyerEmail,
        buyerPhone: buyerPhone,
        subtotal: subtotal,
        fee: fee,
        total: total,
        status: 'confirmed',
        purchasedAt: new Date().toISOString()
    };

    // Save to localStorage
    const purchases = JSON.parse(localStorage.getItem('hc_lounge_event_tickets') || '[]');
    purchases.push(purchase);
    localStorage.setItem('hc_lounge_event_tickets', JSON.stringify(purchases));

    // Update event tickets available
    const eventsData = JSON.parse(localStorage.getItem('lounge_events') || '[]');
    const event = eventsData.find(e => e.id === selectedEvent.id);
    if (event) {
        event.ticketsAvailable -= ticketQuantity;
        localStorage.setItem('lounge_events', JSON.stringify(eventsData));
    }

    // Show success modal
    showTicketSuccess(purchase);

    // Close ticket modal
    closeTicketModal();

    // Reload events
    loadEvents();
}

// Show ticket success
function showTicketSuccess(purchase) {
    const modal = document.getElementById('ticketSuccessModal');
    if (!modal) return;

    const eventDate = new Date(purchase.eventDate);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    document.getElementById('confirmEmail').textContent = purchase.buyerEmail;
    document.getElementById('confirmId').textContent = purchase.id;
    document.getElementById('confirmEvent').textContent = purchase.eventName;
    document.getElementById('confirmDate').textContent = formattedDate + ' at ' + formatTime(purchase.eventTime);
    document.getElementById('confirmQty').textContent = purchase.quantity + (purchase.quantity === 1 ? ' Ticket' : ' Tickets');
    document.getElementById('confirmTotal').textContent = `₦${purchase.total.toLocaleString()}`;

    modal.classList.add('active');
}

// Close ticket success modal
function closeTicketSuccessModal() {
    const modal = document.getElementById('ticketSuccessModal');
    if (modal) {
        modal.classList.remove('active');
    }
}
