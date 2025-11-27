// app-wide demo JS
if (!localStorage.getItem('hc_demo_init')) {
  // seed demo data
  const seed = {
    users: [
      { id: 1, name: 'Alex Morgan', email: 'alex@demo.com', points: 1200 },
    ],
    bookings: [],
    cards: [ { id: 'CARD-1001', balance: 50 } ],
    events: [ { id: 1, title: 'Live Jazz Night', date: '2025-12-05', seats: 50 }, { id: 2, title: 'Wine Pairing Dinner', date: '2025-12-12', seats: 30 } ],
  };
  localStorage.setItem('hc_demo', JSON.stringify(seed));
  localStorage.setItem('hc_demo_init', '1');
}
