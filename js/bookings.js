// Unified bookings page that supports departments
function getDemo(){ return JSON.parse(localStorage.getItem('hc_demo')||'{}'); }
function saveDemo(d){ localStorage.setItem('hc_demo', JSON.stringify(d)); }

const deptServices = {
  playplanet: [ {id:1,name:'Arcade Session', price:10}, {id:2,name:'Family Pack', price:30} ],
  spa: [ {id:1,name:'Massage - 60m', price:80}, {id:2,name:'Facial - 45m', price:65} ],
  cinema: [ {id:1,name:'Standard Seat', price:8}, {id:2,name:'VIP Seat', price:15} ],
  lounge: [ {id:1,name:'Table Reservation', price:0} ],
  restaurant: [ {id:1,name:'Table for 2', price:0}, {id:2,name:'Private Dining', price:150} ],
  superstore: [ {id:1,name:'Gift Card', price:50} ]
};

function populateDeptSelector(){ const sel=document.getElementById('dept-select'); if(!sel) return; sel.innerHTML=''; Object.keys(deptServices).forEach(k=>{ const opt=document.createElement('option'); opt.value=k; opt.textContent = k.charAt(0).toUpperCase()+k.slice(1); sel.appendChild(opt); }); }

function render(){ const sel=document.getElementById('dept-select'); if(!sel) return; const dept = sel.value || (new URLSearchParams(location.search).get('dept') || 'playplanet'); sel.value = dept;
  const info = document.getElementById('dept-info'); info.innerHTML = `<h2 class="text-xl font-semibold">${dept.charAt(0).toUpperCase()+dept.slice(1)}</h2><p class="text-gray-600">Information about ${dept} department. Book services below.</p>`;
  const sl=document.getElementById('services-list'); sl.innerHTML=''; (deptServices[dept]||[]).forEach(s=>{ const r=document.createElement('div'); r.className='p-3 border rounded flex justify-between items-center'; r.innerHTML = `<div><strong>${s.name}</strong><div class="text-sm text-gray-600">$${s.price}</div></div><div><input type="radio" name="svc" value="${s.id}" data-name="${s.name}" data-price="${s.price}" /></div>`; sl.appendChild(r); });

  // upcoming
  const d=getDemo(); const up=document.getElementById('upcoming'); up.innerHTML = (d.bookings||[]).map(b=>`<div>${b.dept} • ${b.service||b.seats||b.event||''} • ${b.time||''}</div>`).join('')||'<div>No upcoming bookings</div>';
}

function initBookings(){ populateDeptSelector();
  const sel = document.getElementById('dept-select');
  const urlDept = new URLSearchParams(location.search).get('dept');
  if(urlDept && sel) sel.value = urlDept;
  render();

  if(sel) sel.addEventListener('change', render);

  const confirmBtn = document.getElementById('confirm-book');
  if(confirmBtn) confirmBtn.addEventListener('click', ()=>{
    const dept = document.getElementById('dept-select').value; const dt=document.getElementById('bk-datetime').value; const selSvc = document.querySelector('input[name="svc"]:checked'); if(!selSvc || !dt) return alert('Select a service and date/time'); const d=getDemo(); d.bookings = d.bookings||[]; const booking={ id:'B-'+Date.now(), dept, service: selSvc.dataset.name, time: dt, user: d.users && d.users[0] ? d.users[0].email : 'guest' }; d.bookings.push(booking); saveDemo(d); const modal=document.getElementById('confirm-modal'); const body=document.getElementById('confirm-body'); if(body) body.innerHTML = `Booked ${booking.service} at ${booking.time} (${booking.dept})`; if(modal) modal.classList.remove('hidden'); render(); });

  const closeBtn = document.getElementById('close-confirm'); if(closeBtn) closeBtn.addEventListener('click', ()=>{ const modal=document.getElementById('confirm-modal'); if(modal) modal.classList.add('hidden'); });
}

document.addEventListener('DOMContentLoaded', initBookings);

// allow opening department pages from discover menu by linking dept pages that set ?dept=...
