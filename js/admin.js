// Admin demo
function getDemo(){ return JSON.parse(localStorage.getItem('hc_demo')||'{}'); }

function renderBookings(){ const d=getDemo(); const tbody=document.querySelector('#bookings-table tbody'); tbody.innerHTML=''; (d.bookings||[]).forEach(b=>{ const tr=document.createElement('tr'); tr.innerHTML=`<td class="border px-2 py-1">${b.id}</td><td class="border px-2 py-1">${b.dept}</td><td class="border px-2 py-1">${b.service||b.seats||b.event||''}</td><td class="border px-2 py-1">${b.time||''}</td>`; tbody.appendChild(tr); }); }

document.getElementById('scan-btn').addEventListener('click',()=>{ const text=document.getElementById('scan-input').value; const res=document.getElementById('scan-result'); if(!text) return; // parse
  if(text.startsWith('CINEMA:')){ res.textContent = 'Scanned cinema booking: '+text.split(':')[1]; } else if(text.startsWith('CARD-')){ res.textContent = 'Scanned card: '+text; } else { res.textContent = 'Unknown QR content: '+text; } });

document.getElementById('print-report').addEventListener('click',()=>{ window.print(); });

renderBookings();
