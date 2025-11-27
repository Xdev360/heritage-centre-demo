# 🎬 Heritage Cinema - Complete Booking System

## Overview
A world-class cinema booking system built with modern UI/UX standards, inspired by AMC Cinemas, Vue Cinema, BookMyShow, and FilmHouse NG. This system provides a complete end-to-end booking experience from movie selection to ticket confirmation.

## 🌟 Features

### Customer-Facing Pages

#### 1. **Cinema Landing Page** (`cinema-booking.html`)
- Full-width hero banner
- Sticky horizontal date selector (Today, Tomorrow, +7 days)
- Genre, Format (VIP/Standard), and Time filters
- Movie cards with:
  - High-quality posters
  - Title, Genre, Duration, Rating
  - "Filling Fast" badges for popular shows
  - "View Showtimes" CTA buttons
- Mobile-first responsive design

#### 2. **Movie Detail Page** (`cinema-movie-detail.html`)
- Large movie poster
- Complete synopsis
- Cast and crew information
- Trailer preview button
- Showtimes grouped by date
- Each showtime shows:
  - Time
  - Cinema Hall
  - Seat availability (Low/Medium/High)
  - Ticket price
  - VIP/Standard format
  - "POPULAR" badges for best-selling times

#### 3. **Seat Selection Page** (`cinema-seat-selection.html`)
- **World-class seat map** with:
  - Color-coded seats (White=Available, Grey=Unavailable, Blue=Selected, Gold=VIP)
  - Rows labeled A-J
  - Couple seats support
  - VIP sections
  - Seat tooltips on hover
  - Zoomable view (desktop)
  - Center-aligned scrollable map
- Sticky footer showing:
  - Selected seat numbers
  - Ticket subtotal
  - "Continue" CTA
- Max 6 seats limit per booking
- Auto-scroll to selected seats

#### 4. **Snacks & Add-Ons Page** (`cinema-snacks.html`)
- **Combo Deals** (Best Value section)
- **Categories**: Popcorn, Drinks, Hot Food
- Each item shows:
  - High-quality image
  - Name and size
  - Price
  - Quantity counter (+/-)
  - Badges: "Popular", "New", "Best Deal"
- Sticky footer with:
  - Item count
  - Total price
  - "Continue" button
- Skip option available

#### 5. **Booking Summary Page** (`cinema-summary.html`)
- Receipt-style clean layout
- Movie thumbnail and details
- Show start/end time calculation
- Selected seats list with VIP indicators
- Snacks breakdown
- Price breakdown:
  - Tickets subtotal
  - Snacks subtotal
  - Service fee
  - VAT (7.5%)
  - Grand total
- Edit buttons for seats and snacks
- Refund policy notice

#### 6. **Login/Checkout Page** (`cinema-checkout.html`)
- Three authentication options:
  - **Guest Checkout** (email only, quickest)
  - **Login with OTP** (for members)
  - **Create Account** (new members)
- Minimal fields design
- Nigerian user-friendly (OTP preferred)
- Total amount display

#### 7. **Payment Page** (`cinema-payment.html`)
- Payment method selection:
  - Card Payment (Visa/Mastercard via Paystack)
  - Bank Transfer (with account details)
  - USSD (GTBank, Access, Zenith codes)
  - Digital Wallet (Apple Pay, Google Pay)
- Secure card form
- Loading state during processing
- "Do not refresh" warning
- Order summary sidebar
- 🔒 Security badge

#### 8. **Booking Confirmation Page** (`cinema-confirmation.html`)
- ✅ Success animation with checkmark
- Booking reference number
- Movie details with poster
- Date, time, hall information
- Selected seats
- **QR Code** for cinema entry (generated via QRCode.js)
- **Snacks Pickup Code** (if applicable)
- Quick actions:
  - 📥 Download Ticket (PDF)
  - 📅 Add to Calendar (.ics)
  - 📧 Email Ticket
- Important information section
- Refund policy
- "Book Another Movie" and "View Bookings" buttons

### Admin & Management Pages

#### 9. **Admin Dashboard** (`cinema-admin.html`)
- **Stats Overview**:
  - Today's bookings
  - Today's revenue
  - Active shows
  - Total customers
- **Quick Actions**:
  - Add Movie
  - Add Showtime
  - QR Scanner
  - Print Report
- **Filters**:
  - Date picker
  - Movie selector
  - Hall selector
  - Status filter
- **Bookings Table** with:
  - Booking ID
  - Movie name
  - Date & Time
  - Hall
  - Seats
  - Customer info
  - Amount
  - Status badges (Confirmed/Used)
  - View action
- **QR Code Scanner**:
  - Manual entry option
  - Validation feedback
  - Auto-mark as used
  - Display ticket details
- **CSV Export** functionality

#### 10. **CEO Dashboard** (`cinema-ceo.html`)
- **Executive KPIs**:
  - Total Revenue (with % change)
  - Tickets Sold (with trend)
  - Average Ticket Price
  - Snacks Revenue
- **Charts** (using Chart.js):
  - Revenue Trend (7-day line chart)
  - Daily Bookings (bar chart)
  - Movie Performance Ranking (horizontal bar)
  - Revenue Sources (doughnut chart)
  - Hall Occupancy Rate (bar chart)
  - Peak Hour Traffic (line chart)
- **Top Performing Movies Table**:
  - Ranking with medal badges
  - Tickets sold
  - Revenue
  - Occupancy percentage
  - Trend indicators
- Period selector (Today/Week/Month/Year)
- PDF export button

## 🎨 Design System

### Color Palette
```css
Background:     #0F0F0F (Dark)
Card BG:        #1C1C1C (Dark Card)
Primary:        #0A84FF (Blue)
Gold Accent:    #FFD700 (VIP)
Text:           #FFFFFF (White)
```

### Typography
- **Headings**: Poppins (Semibold/Bold)
- **Body**: Inter (Regular/Medium/Semibold)

### Component Styling
- Large, tappable buttons
- Rounded corners (8px-16px)
- Subtle glassmorphism effects
- Smooth hover transitions
- Shadow depth for cards
- High contrast for accessibility

## 📱 Mobile-First Approach
- All pages fully responsive
- Touch-friendly 44px minimum tap targets
- Optimized seat map for mobile
- Sticky navigation
- Bottom sheet patterns for mobile
- Horizontal scrolling where appropriate

## 🔧 Technical Implementation

### Frontend Stack
- **HTML5** (Semantic markup)
- **TailwindCSS** (Utility-first CSS via CDN)
- **Vanilla JavaScript** (ES6+)
- **Chart.js** (Analytics visualization)
- **QRCode.js** (Ticket QR generation)

### Data Storage
- **LocalStorage** for:
  - Movie data
  - Showtimes
  - Booking state
  - Completed bookings
  - User information

### Key Features
- No backend required (demo mode)
- Real-time seat availability
- Dynamic pricing (VIP vs Standard)
- Automatic calculations (subtotal, VAT, total)
- Booking reference generation
- Email/SMS simulation

## 📂 File Structure
```
Heritage Center/
├── cinema-booking.html           # Landing page (Now Showing)
├── cinema-movie-detail.html      # Movie details + showtimes
├── cinema-seat-selection.html    # Seat map
├── cinema-snacks.html            # Snacks & add-ons
├── cinema-summary.html           # Booking summary
├── cinema-checkout.html          # Login/guest checkout
├── cinema-payment.html           # Payment methods
├── cinema-confirmation.html      # Success page
├── cinema-admin.html             # Admin dashboard
├── cinema-ceo.html               # CEO analytics
├── js/
│   └── cinema-booking.js         # Movie data & logic
└── CINEMA-README.md              # This file
```

## 🎯 User Flow
```
1. Cinema Landing → Browse movies by date/genre/format
2. Movie Detail → View showtimes, select showtime
3. Seat Selection → Choose seats (max 6)
4. Snacks → Add food/drinks (optional)
5. Summary → Review booking
6. Checkout → Guest/Login/Signup
7. Payment → Pay via Card/Transfer/USSD/Wallet
8. Confirmation → Get QR code & booking reference
```

## 🚀 Getting Started

### For Users
1. Open `cinema-booking.html`
2. Browse movies
3. Select showtime
4. Choose seats
5. Add snacks (optional)
6. Complete checkout
7. Make payment
8. Get your ticket!

### For Admins
1. Open `cinema-admin.html`
2. View bookings table
3. Scan QR codes to validate
4. Filter by date/movie/hall
5. Export reports

### For Management
1. Open `cinema-ceo.html`
2. View executive KPIs
3. Analyze performance charts
4. Review top movies
5. Export PDF reports

## 📊 Demo Data

### Movies (8 titles)
- Quantum Nexus (Sci-Fi, 2h 18m, 13+)
- Midnight Laughter (Comedy, 1h 45m, PG)
- Shadows of Lagos (Drama, 2h 5m, 18+)
- Thunder Strike (Action, 2h 32m, 13+)
- The Haunting Hour (Horror, 1h 38m, 18+)
- Love in December (Drama, 1h 52m, PG)
- Galaxy Warriors (Sci-Fi, 2h 45m, 13+)
- The Last Laugh (Comedy, 1h 58m, 13+)

### Cinema Halls
- Screen 1 (Standard)
- Screen 2 (Standard/VIP)
- Screen 3 (Standard)
- VIP Lounge (VIP only)

### Pricing
- Standard: ₦2,500 - ₦3,500
- VIP: ₦5,000 - ₦6,500
- Service Fee: ₦150
- VAT: 7.5%

## 🔐 Security Notes
- No real payment processing (demo mode)
- No backend authentication (demo logins)
- LocalStorage data (not production-ready)
- QR codes are demo strings

## 🎬 Production Enhancements
For a live production system, implement:
- Backend API (Node.js/Django/Laravel)
- Database (PostgreSQL/MongoDB)
- Payment gateway integration (Paystack/Flutterwave)
- Email service (SendGrid/Mailgun)
- SMS service (Twilio/Termii)
- Real QR code validation
- User authentication (JWT/OAuth)
- Admin authentication & RBAC
- CDN for images
- Analytics (Google Analytics/Mixpanel)
- A/B testing
- Performance monitoring

## 📄 License
This is a demo project for Heritage Centre.

## 👨‍💻 Development
Built with ❤️ using modern web standards and best practices.

---

**Version**: 1.0.0  
**Last Updated**: November 27, 2025
