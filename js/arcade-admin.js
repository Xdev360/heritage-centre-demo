// PlayPlanet Arcade Admin JavaScript
// Storage keys
const CARDS_KEY = 'pp_arcade_cards';
const PAYMENTS_KEY = 'pp_arcade_payments';
const PRICES_KEY = 'pp_arcade_prices';
const VR_GAMES_KEY = 'pp_vr_games';

// Initialize default VR games
function initializeVRGames() {
  let games = JSON.parse(localStorage.getItem(VR_GAMES_KEY) || '[]');
  if (games.length === 0) {
    games = [
      {id: 1, title: 'Beat Saber', category: 'Interactive', duration: 15, image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&q=80'},
      {id: 2, title: 'Superhot VR', category: 'Shooting', duration: 20, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80'},
      {id: 3, title: 'Walking Dead VR', category: 'Horror', duration: 25, image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80'},
      {id: 4, title: 'Moss', category: 'Adventure', duration: 20, image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80'},
      {id: 5, title: 'Half-Life: Alyx', category: 'Shooting', duration: 30, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&q=80'},
      {id: 6, title: 'Job Simulator', category: 'Interactive', duration: 15, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80'},
      {id: 7, title: 'Pavlov VR', category: 'Shooting', duration: 20, image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&q=80'},
      {id: 8, title: 'Table Tennis VR', category: 'Interactive', duration: 15, image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=400&q=80'}
    ];
    localStorage.setItem(VR_GAMES_KEY, JSON.stringify(games));
  }
  return games;
}

function checkAuth() {
  const dept = localStorage.getItem('hc_department');
  const user = JSON.parse(localStorage.getItem('hc_user') || '{}');
  
  if (dept !== 'arcade' && dept !== 'ceo') {
    alert('Access denied. Arcade admin privileges required.');
    window.location.href = 'admin-login.html';
    return;
  }
  
  if (user.name) {
    document.getElementById('user-name').textContent = user.name;
  }
}

function switchTab(tab) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  
  const tabBtn = Array.from(document.querySelectorAll('.admin-tab')).find(t => t.getAttribute('onclick').includes(tab));
  if (tabBtn) tabBtn.classList.add('active');
  
  const tabContent = document.getElementById(`tab-${tab}`);
  if (tabContent) tabContent.classList.add('active');
}

function logout() {
  localStorage.removeItem('hc_user');
  localStorage.removeItem('hc_user_role');
  localStorage.removeItem('hc_department');
  window.location.href = 'index.html';
}

// Preload Cards Modal
function showPreloadModal() {
  document.getElementById('preload-modal').style.display = 'flex';
}

function closePreloadModal() {
  document.getElementById('preload-modal').style.display = 'none';
}

function preloadCards() {
  const start = parseInt(document.getElementById('card-start').value);
  const end = parseInt(document.getElementById('card-end').value);

  if (start < 1 || end < start) {
    alert('Invalid range. Start must be 1 or greater, and end must be greater than start.');
    return;
  }

  let cards = JSON.parse(localStorage.getItem(CARDS_KEY) || '[]');
  let newCards = 0;

  for (let i = start; i <= end; i++) {
    const cardNumber = String(i).padStart(4, '0');
    const exists = cards.find(c => c.cardNumber === cardNumber);
    
    if (!exists) {
      cards.push({
        cardNumber: cardNumber,
        status: 'available',
        customerName: null,
        customerEmail: null,
        customerPhone: null,
        chips: 0,
        purchaseDate: null
      });
      newCards++;
    }
  }

  localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
  closePreloadModal();
  alert(`Successfully generated ${newCards} new card numbers!`);
  loadCards();
  loadStats();
}

// Load Cards Table
function loadCards() {
  const cards = JSON.parse(localStorage.getItem(CARDS_KEY) || '[]');
  const tbody = document.getElementById('cards-list');

  if (cards.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; color: var(--neutral-500); padding: var(--space-8);">No cards loaded. Click "Preload Card Numbers" to start.</td></tr>';
    return;
  }

  let html = '';
  cards.forEach(card => {
    html += `
      <tr>
        <td><strong>PP-${card.cardNumber}</strong></td>
        <td><span class="status-badge status-${card.status}">${card.status.toUpperCase()}</span></td>
        <td>${card.customerName || '-'}</td>
        <td>${card.customerEmail || '-'}</td>
        <td>${card.customerPhone || '-'}</td>
        <td>${card.chips || 0} chips</td>
        <td>${card.purchaseDate ? new Date(card.purchaseDate).toLocaleDateString() : '-'}</td>
        <td>
          ${card.status === 'sold' ? `<button class="btn btn-ghost btn-sm" onclick="viewCardDetails('${card.cardNumber}')">View</button>` : ''}
          <button class="btn btn-ghost btn-sm" style="color: var(--error-600);" onclick="deleteCard('${card.cardNumber}')">Delete</button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
  
  // Update summary
  const total = cards.length;
  const available = cards.filter(c => c.status === 'available').length;
  const sold = cards.filter(c => c.status === 'sold').length;
  
  document.getElementById('total-cards').textContent = total;
  document.getElementById('available-cards').textContent = available;
  document.getElementById('sold-cards').textContent = sold;
}

function deleteCard(cardNumber) {
  if (!confirm(`Are you sure you want to delete card PP-${cardNumber}?`)) return;
  
  let cards = JSON.parse(localStorage.getItem(CARDS_KEY) || '[]');
  cards = cards.filter(c => c.cardNumber !== cardNumber);
  localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
  
  loadCards();
  loadStats();
}

function viewCardDetails(cardNumber) {
  const cards = JSON.parse(localStorage.getItem(CARDS_KEY) || '[]');
  const card = cards.find(c => c.cardNumber === cardNumber);
  
  if (card) {
    alert(`Card Details:\n\nCard Number: PP-${card.cardNumber}\nStatus: ${card.status}\nCustomer: ${card.customerName || 'N/A'}\nEmail: ${card.customerEmail || 'N/A'}\nPhone: ${card.customerPhone || 'N/A'}\nChips: ${card.chips}\nPurchase Date: ${card.purchaseDate ? new Date(card.purchaseDate).toLocaleString() : 'N/A'}`);
  }
}

// Load Payments
function loadPayments() {
  const payments = JSON.parse(localStorage.getItem(PAYMENTS_KEY) || '[]');
  
  // Pending Payments
  const pending = payments.filter(p => p.status === 'pending');
  const pendingTbody = document.getElementById('pending-payments-list');
  
  if (pending.length === 0) {
    pendingTbody.innerHTML = '<tr><td colspan="10" style="text-align:center; color: var(--neutral-500); padding: var(--space-8);">No pending payments</td></tr>';
  } else {
    let html = '';
    pending.forEach(payment => {
      html += `
        <tr>
          <td><strong>${payment.bookingId}</strong></td>
          <td>${payment.customerName}</td>
          <td>${payment.customerEmail || '-'}</td>
          <td>${payment.customerPhone}</td>
          <td>${payment.cardNumber ? 'PP-' + payment.cardNumber : '-'}</td>
          <td><small>${payment.itemsSummary || payment.items?.map(i => i.name).join(', ') || '-'}</small></td>
          <td><strong>₦${payment.amount.toLocaleString()}</strong></td>
          <td>${new Date(payment.timestamp).toLocaleString()}</td>
          <td><span class="status-badge status-pending">PENDING</span></td>
          <td>
            <button class="btn btn-primary btn-sm" onclick="approvePayment('${payment.bookingId}')">Approve</button>
            <button class="btn btn-ghost btn-sm" style="color: var(--error-600);" onclick="rejectPayment('${payment.bookingId}')">Reject</button>
          </td>
        </tr>
      `;
    });
    pendingTbody.innerHTML = html;
  }

  // Approved Payments
  const approved = payments.filter(p => p.status === 'approved');
  const approvedTbody = document.getElementById('approved-payments-list');
  
  if (approved.length === 0) {
    approvedTbody.innerHTML = '<tr><td colspan="9" style="text-align:center; color: var(--neutral-500); padding: var(--space-8);">No approved payments yet</td></tr>';
  } else {
    let html = '';
    approved.forEach(payment => {
      html += `
        <tr>
          <td><strong>${payment.bookingId}</strong></td>
          <td>${payment.customerName}</td>
          <td>${payment.customerEmail || '-'}</td>
          <td>${payment.customerPhone}</td>
          <td>${payment.cardNumber ? 'PP-' + payment.cardNumber : '-'}</td>
          <td><small>${payment.itemsSummary || payment.items?.map(i => i.name).join(', ') || '-'}</small></td>
          <td><strong>₦${payment.amount.toLocaleString()}</strong></td>
          <td>${new Date(payment.approvedDate || payment.timestamp).toLocaleString()}</td>
          <td><span class="status-badge status-approved">APPROVED</span></td>
        </tr>
      `;
    });
    approvedTbody.innerHTML = html;
  }
}

function approvePayment(bookingId) {
  if (!confirm('Approve this payment?')) return;

  let payments = JSON.parse(localStorage.getItem(PAYMENTS_KEY) || '[]');
  const payment = payments.find(p => p.bookingId === bookingId);
  
  if (payment) {
    payment.status = 'approved';
    payment.approvedDate = new Date().toISOString();
    localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments));
    
    // Update card status if card purchase
    if (payment.cardNumber) {
      let cards = JSON.parse(localStorage.getItem(CARDS_KEY) || '[]');
      const card = cards.find(c => c.cardNumber === payment.cardNumber);
      if (card) {
        card.status = 'sold';
        card.customerName = payment.customerName;
        card.customerEmail = payment.customerEmail;
        card.customerPhone = payment.customerPhone;
        card.chips = payment.chips || 0;
        card.purchaseDate = payment.approvedDate;
        localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
      }
    }
    
    // Send email notification (simulated)
    console.log(`Email sent to ${payment.customerEmail || payment.customerPhone}: Payment approved for ${payment.bookingId}`);
    
    alert('Payment approved successfully! Email notification sent to customer.');
    loadPayments();
    loadCards();
    loadStats();
  }
}

function rejectPayment(bookingId) {
  const reason = prompt('Rejection reason:');
  if (!reason) return;

  let payments = JSON.parse(localStorage.getItem(PAYMENTS_KEY) || '[]');
  const payment = payments.find(p => p.bookingId === bookingId);
  
  if (payment) {
    payment.status = 'rejected';
    payment.rejectionReason = reason;
    localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments));
    
    alert('Payment rejected');
    loadPayments();
    loadStats();
  }
}

// Search
function performSearch() {
  const query = document.getElementById('search-input').value.toLowerCase().trim();
  const resultsDiv = document.getElementById('search-results');

  if (query.length < 2) {
    resultsDiv.innerHTML = '<p style="text-align: center; color: var(--neutral-500); padding: var(--space-8);">Enter at least 2 characters to search</p>';
    return;
  }

  const cards = JSON.parse(localStorage.getItem(CARDS_KEY) || '[]');
  const results = cards.filter(card => 
    card.cardNumber.includes(query) ||
    (card.customerName && card.customerName.toLowerCase().includes(query)) ||
    (card.customerEmail && card.customerEmail.toLowerCase().includes(query)) ||
    (card.customerPhone && card.customerPhone.includes(query))
  );

  if (results.length === 0) {
    resultsDiv.innerHTML = '<p style="text-align: center; color: var(--neutral-500); padding: var(--space-8);">No results found</p>';
    return;
  }

  let html = '<table class="data-table"><thead><tr><th>Card Number</th><th>Status</th><th>Customer</th><th>Email</th><th>Phone</th><th>Chips</th><th>Purchase Date</th></tr></thead><tbody>';
  
  results.forEach(card => {
    html += `
      <tr>
        <td><strong>PP-${card.cardNumber}</strong></td>
        <td><span class="status-badge status-${card.status}">${card.status.toUpperCase()}</span></td>
        <td>${card.customerName || '-'}</td>
        <td>${card.customerEmail || '-'}</td>
        <td>${card.customerPhone || '-'}</td>
        <td>${card.chips} chips</td>
        <td>${card.purchaseDate ? new Date(card.purchaseDate).toLocaleDateString() : '-'}</td>
      </tr>
    `;
  });
  
  html += '</tbody></table>';
  resultsDiv.innerHTML = html;
}

// VR Games
function loadVRGames() {
  const games = initializeVRGames();
  const grid = document.getElementById('vr-games-grid');

  let html = '';
  games.forEach(game => {
    html += `
      <div class="card" style="padding: var(--space-4);">
        <img src="${game.image}" alt="${game.title}" class="game-card-preview" style="width: 100%; height: 150px; border-radius: var(--radius-md); object-fit: cover; margin-bottom: var(--space-3);">
        <h4 style="margin-bottom: var(--space-2);">${game.title}</h4>
        <p style="color: var(--neutral-600); font-size: 0.875rem; margin-bottom: var(--space-2);">${game.category} • ${game.duration} min</p>
        <div style="display: flex; gap: var(--space-2);">
          <button class="btn btn-ghost btn-sm" onclick="editVRGame(${game.id})">Edit</button>
          <button class="btn btn-ghost btn-sm" style="color: var(--error-600);" onclick="deleteVRGame(${game.id})">Delete</button>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;
}

function showAddGameModal() {
  alert('Add VR Game feature - implement modal for uploading game image, title, category, and duration');
}

function editVRGame(id) {
  alert(`Edit VR Game ${id} - implement edit functionality`);
}

function deleteVRGame(id) {
  if (!confirm('Delete this VR game?')) return;
  let games = JSON.parse(localStorage.getItem(VR_GAMES_KEY) || '[]');
  games = games.filter(g => g.id !== id);
  localStorage.setItem(VR_GAMES_KEY, JSON.stringify(games));
  loadVRGames();
}

// Pricing
function savePricing() {
  const prices = {
    card35: document.getElementById('price-card-35').value,
    card70: document.getElementById('price-card-70').value,
    card105: document.getElementById('price-card-105').value,
    card140: document.getElementById('price-card-140').value,
    ps5Solo: document.getElementById('price-ps5-solo').value,
    ps5Duo: document.getElementById('price-ps5-duo').value,
    vr: document.getElementById('price-vr').value
  };

  localStorage.setItem(PRICES_KEY, JSON.stringify(prices));
  alert('Prices saved successfully!');
}

// Stats
function loadStats() {
  const cards = JSON.parse(localStorage.getItem(CARDS_KEY) || '[]');
  const payments = JSON.parse(localStorage.getItem(PAYMENTS_KEY) || '[]');

  const available = cards.filter(c => c.status === 'available').length;
  const sold = cards.filter(c => c.status === 'sold').length;
  const pending = payments.filter(p => p.status === 'pending').length;
  const approved = payments.filter(p => p.status === 'approved').length;
  const totalRevenue = payments.filter(p => p.status === 'approved').reduce((sum, p) => sum + p.amount, 0);

  document.getElementById('stat-available').textContent = available;
  document.getElementById('stat-sold').textContent = sold;
  document.getElementById('stat-pending').textContent = pending;
  document.getElementById('stat-approved').textContent = approved;
  document.getElementById('stat-revenue').textContent = '₦' + totalRevenue.toLocaleString();

  // Notifications
  const notifBadge = document.getElementById('notif-badge');
  if (pending > 0) {
    notifBadge.textContent = pending;
    notifBadge.style.display = 'block';
  } else {
    notifBadge.style.display = 'none';
  }
}

function showNotifications() {
  const pending = JSON.parse(localStorage.getItem(PAYMENTS_KEY) || '[]').filter(p => p.status === 'pending');
  if (pending.length === 0) {
    alert('No new notifications');
  } else {
    switchTab('pending-payments');
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  loadStats();
  loadCards();
  loadPayments();
  loadVRGames();
});
