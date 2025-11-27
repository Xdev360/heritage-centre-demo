// Lounge & Events demo
function getDemo(){ return JSON.parse(localStorage.getItem('hc_demo')||'{}'); }
function saveDemo(d){ localStorage.setItem('hc_demo', JSON.stringify(d)); }

function renderEvents(){ const d=getDemo(); const list=document.getElementById('event-list'); const sel=document.getElementById('res-event'); list.innerHTML=''; sel.innerHTML=''; (d.events||[]).forEach(e=>{ const el=document.createElement('div'); el.className='p-3 border rounded mb-2'; el.innerHTML=`<div class="font-semibold">${e.title}</div><div class="text-sm text-gray-600">${e.date} • Seats: ${e.seats}</div>`; list.appendChild(el); const opt=document.createElement('option'); opt.value=e.id; opt.textContent=e.title+' - '+e.date; sel.appendChild(opt); }); }

document.getElementById('res-submit').addEventListener('click',()=>{ const d=getDemo(); const eventId=parseInt(document.getElementById('res-event').value); const name=document.getElementById('res-name').value||'Guest'; const guests=parseInt(document.getElementById('res-guests').value)||1; const ev=(d.events||[]).find(x=>x.id===eventId); const res={ id:'R-'+Date.now(), event: ev? ev.title: 'Unknown', name, guests }; d.bookings = d.bookings||[]; d.bookings.push(res); saveDemo(d); document.getElementById('res-body').textContent = `Reservation for ${name} at ${res.event} — ${guests} guests.`; document.getElementById('res-modal').classList.remove('hidden'); });

document.getElementById('close-res').addEventListener('click',()=>{ document.getElementById('res-modal').classList.add('hidden'); });

renderEvents();
