# Peer-to-Peer Payment System Documentation

## Overview
Heritage Centre now uses a **manual bank transfer payment system** with admin verification instead of automated payment gateways. This eliminates third-party fees and provides full control over payment approval.

---

## 🔄 Payment Flow

### **User Journey**

1. **Initiate Payment** (`cinema-payment.html` or any checkout)
   - User completes booking/purchase
   - Clicks "Complete Payment"
   - System generates unique booking reference (e.g., `HC17328765XABC`)

2. **Payment Confirmation Page** (`payment-confirmation.html`)
   - Displays bank account details:
     - Bank Name: First Bank of Nigeria
     - Account Number: 3012345678
     - Account Name: Heritage Centre Limited
   - Shows **5-minute countdown timer**
   - User copies details and transfers exact amount from their bank app
   - After transfer, user clicks **"Payment Sent"** button

3. **Payment Status Page** (`payment-status.html`)
   - Shows **"Payment Verification Pending"** status
   - Timeline with 4 stages:
     - ✅ Payment Initiated
     - ✅ Transfer Confirmed by You
     - ⏳ Admin Verification (in progress)
     - ⏹️ Booking Confirmed (pending)
   - Auto-refreshes every 15 seconds
   - Status updates in real-time when admin approves/rejects

---

### **Admin Journey**

1. **Access Payment Dashboard** (`admin-payments.html`)
   - Navigate to: Admin Dashboard → Payment Verification
   - Requires `admin` or `ceo` role in localStorage

2. **Review Pending Payments**
   - Dashboard shows:
     - Total pending payments count
     - Total pending amount
     - Approved/rejected counts
   - Each payment card displays:
     - Booking reference
     - Amount
     - Customer details
     - Service type
     - Timestamp

3. **Verify Bank Transfer**
   - Admin checks their actual bank account
   - Confirms transfer received from customer
   - Amount matches exactly
   - Booking reference in transfer narration

4. **Approve or Reject**
   - **Approve**: Updates status to `approved`, customer sees confirmation
   - **Reject**: Enter reason, customer sees rejection message
   - Both actions trigger real-time update on user's status page

---

## 📂 File Structure

```
Heritage Center/
├── payment-confirmation.html   # Step 1: Bank details & countdown
├── payment-status.html          # Step 2: User tracking page
├── admin-payments.html          # Admin verification dashboard
└── cinema-payment.html          # Modified to redirect to new flow
```

---

## 🗄️ LocalStorage Data Structure

### Individual Payment Record
**Key**: `hc_pending_payment_{bookingId}`
```json
{
  "bookingId": "HC17328765XABC",
  "amount": 5500,
  "serviceType": "Cinema: Avengers Endgame",
  "datetime": "2024-11-27T18:30:00Z",
  "status": "pending",           // awaiting_transfer | pending | approved | rejected
  "createdAt": "2024-11-27T14:00:00Z",
  "expiresAt": "2024-11-27T14:05:00Z",
  "confirmedAt": "2024-11-27T14:02:30Z",
  "approvedAt": "2024-11-27T15:30:00Z",
  "approvedBy": "Admin",
  "rejectedAt": null,
  "rejectionReason": null,
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "bookingDetails": { ... }
}
```

### All Pending Payments List
**Key**: `hc_all_pending_payments`
```json
[
  { /* payment object 1 */ },
  { /* payment object 2 */ },
  ...
]
```

---

## 🎨 Payment Statuses

| Status | Description | User View | Admin Action |
|--------|-------------|-----------|--------------|
| `awaiting_transfer` | User on payment confirmation page | Timer running | N/A |
| `pending` | User clicked "Payment Sent" | Pending verification | Can approve/reject |
| `approved` | Admin verified & approved | ✅ Booking confirmed | Done |
| `rejected` | Admin rejected transfer | ❌ Rejection reason shown | Done |

---

## ⏱️ Timer & Expiry

- **5-minute countdown** starts when user lands on payment-confirmation.html
- Timer stored in payment data (`expiresAt`)
- If timer expires:
  - "Payment Sent" button disabled
  - User must restart booking process
- **Does NOT auto-cancel** pending payments (admin can still verify late)

---

## 🔐 Admin Access Control

```javascript
// Check admin role
const user = JSON.parse(localStorage.getItem('hc_user') || 'null');
const role = localStorage.getItem('hc_user_role') || '';

if (role !== 'admin' && role !== 'ceo') {
  alert('Access denied. Admin privileges required.');
  window.location.href = 'index.html';
}
```

Set admin role in browser console for testing:
```javascript
localStorage.setItem('hc_user', JSON.stringify({name: 'Admin User', email: 'admin@heritage.ng'}));
localStorage.setItem('hc_user_role', 'admin');
```

---

## 🧪 Testing Flow

### 1. Create Test Booking
```javascript
// In browser console on cinema-booking.html
localStorage.setItem('cinemaBooking', JSON.stringify({
  movieTitle: 'Test Movie',
  showtime: '2024-11-28T19:00:00Z',
  grandTotal: 5500,
  seats: ['A1', 'A2']
}));
```

### 2. Navigate Through Payment
1. Go to `cinema-payment.html`
2. Click "Complete Payment"
3. Redirected to `payment-confirmation.html`
4. Observe 5-minute countdown
5. Click "Payment Sent"
6. Redirected to `payment-status.html` (shows "Pending")

### 3. Admin Approval
1. Open new tab → `admin-payments.html`
2. Set admin role (see above)
3. Find pending payment in list
4. Click "Approve Payment"
5. Refresh user status page → sees "Payment Approved ✅"

---

## 🚀 Integration with Other Services

To add payment to **any service** (Spa, Arcade, Restaurant):

```javascript
// On checkout page
function initiatePayment(amount, serviceName, bookingDetails) {
  const bookingRef = 'HC' + Date.now().toString().slice(-8) + 
                     Math.random().toString(36).substring(2, 6).toUpperCase();
  
  const paymentUrl = new URL('payment-confirmation.html', window.location.origin);
  paymentUrl.searchParams.set('bookingId', bookingRef);
  paymentUrl.searchParams.set('amount', amount);
  paymentUrl.searchParams.set('service', serviceName);
  paymentUrl.searchParams.set('datetime', new Date().toISOString());
  
  window.location.href = paymentUrl.toString();
}

// Example usage
initiatePayment(15000, 'Spa: Full Day Bliss Package', {...});
```

---

## 📧 Future Enhancements

- [ ] Email notifications on payment status change
- [ ] SMS notifications for approved/rejected payments
- [ ] Upload proof of payment (screenshot)
- [ ] Bulk approval for multiple payments
- [ ] Export payment reports (CSV/PDF)
- [ ] Payment history page for users
- [ ] Webhook integration for bank alerts

---

## ⚠️ Important Notes

1. **Bank Details**: Update bank account info in `payment-confirmation.html` (lines 89-94)
2. **Timer Duration**: Change countdown from 5 minutes by editing `timeRemaining = 300` (line 253)
3. **Auto-Refresh**: Status page refreshes every 15 seconds (configurable in `payment-status.html` line 236)
4. **Admin Access**: Ensure proper authentication before deploying to production
5. **Data Persistence**: Uses localStorage (consider backend DB for production)

---

## 🔗 Quick Links

- User Payment Flow: `index.html` → Booking → `cinema-payment.html` → `payment-confirmation.html` → `payment-status.html`
- Admin Dashboard: `admin-payments.html` (requires admin role)
- Payment Status Check: `payment-status.html?bookingId=HC...`

---

**Last Updated**: November 27, 2024  
**Version**: 1.0.0
